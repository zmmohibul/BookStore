using API.DTOs.Order;
using API.Entities.Identity;
using API.Entities.OrderAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly DataContext _dataContext;
    private readonly UserManager<User> _userManager;
    private readonly IBookRepository _bookRepository;
    private readonly IMapper _mapper;

    public OrderRepository(DataContext dataContext, UserManager<User> userManager, IBookRepository bookRepository, IMapper mapper)
    {
        _dataContext = dataContext;
        _userManager = userManager;
        _bookRepository = bookRepository;
        _mapper = mapper;
    }


    public async Task<Result<PaginatedList<OrderDto>>> GetAllOrders(string username, PaginationParams paginationParams, QueryParameters queryParameters)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(user => user.UserName.Equals(username));
        
        if (user == null)
        {
            return Result<PaginatedList<OrderDto>>.UnauthorizedResult("Please login to continue");
        }

        var query = _dataContext.Orders.AsNoTracking();
        
        var roles = await _userManager.GetRolesAsync(user);
        if (roles[0] != UserRoles.Admin.ToString())
        {
            query = query.Where(order => order.OrderedByUserId.Equals(user.Id));
        }
        else
        {
            query = query.Include(order => order.OrderedByUser)
                .ThenInclude(orderUser => orderUser.Addresses);
        }

        if (queryParameters.OrderStatus != null)
        {
            query = query.Where(order => order.OrderStatus == queryParameters.OrderStatus);
        }

        query = query.OrderByDescending(order => order.OrderDate);

        var projectedQuery = query
            .ProjectTo<OrderDto>(_mapper.ConfigurationProvider);
        
        var data = await PaginatedList<OrderDto>
            .CreatePaginatedListAsync(projectedQuery, paginationParams.PageNumber, paginationParams.PageSize);
        
        return Result<PaginatedList<OrderDto>>.OkResult(data);
    }

    public async Task<Result<OrderDto>> GetAllOrderById(string username, int orderId)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<OrderDto>> CreateOrder(string username, CreateOrderDto createOrderDto)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(user => user.UserName.Equals(username));

        if (user == null)
        {
            return Result<OrderDto>.UnauthorizedResult("Please login to continue");
        }
        
        var roles = await _userManager.GetRolesAsync(user);
        if (roles[0] == UserRoles.Admin.ToString())
        {
            return Result<OrderDto>.UnauthorizedResult("Admin cannot place order.");
        }

        if (createOrderDto.OrderBookItems.Count == 0)
        {
            return Result<OrderDto>.BadRequestResult("There are no items to be ordered");
        }

        var order = new Order
        {
            OrderedByUser = user
        };

        decimal subtotal = 0;
        foreach (var orderBookItemDto in createOrderDto.OrderBookItems)
        {
            var book = await _dataContext.Books.SingleOrDefaultAsync(b => b.Id == orderBookItemDto.BookId);
            if (book == null)
            {
                return Result<OrderDto>.BadRequestResult($"Invalid book id: {orderBookItemDto.BookId}");
            }
            
            var orderItem = new OrderItem()
            {
                Price = orderBookItemDto.BookType == OrderedBookType.Paperback ? book.PaperbackPrice : book.HardcoverPrice,
                BookDetails = new OrderBookDetail()
                {
                    BookId = book.Id,
                    BookName = book.Name,
                    BookType = orderBookItemDto.BookType,
                    PictureUrl = book.Pictures.Count == 0 ? "" : book.Pictures.First().Url
                }

            };
            

            if (orderBookItemDto.BookType == OrderedBookType.Paperback)
            {
                if (book.PaperbackQuantity == 0)
                {
                    continue;
                }
                
                if (book.PaperbackQuantity >= orderBookItemDto.Quantity)
                {
                    orderItem.Quantity = orderBookItemDto.Quantity;
                    book.PaperbackQuantity -= orderBookItemDto.Quantity;
                }
                else
                {
                    orderItem.Quantity = book.PaperbackQuantity;
                    book.PaperbackQuantity = 0;
                }
            }
            else
            {
                if (book.HardcoverQuantity == 0)
                {
                    continue;
                } 
                
                if (book.HardcoverQuantity >= orderBookItemDto.Quantity)
                {
                    orderItem.Quantity = orderBookItemDto.Quantity;
                    book.HardcoverQuantity -= orderBookItemDto.Quantity;
                }
                else
                {
                    orderItem.Quantity = book.HardcoverQuantity;
                    book.HardcoverQuantity = 0;
                }
            }

            subtotal += (orderItem.Price * orderItem.Quantity);
            
            order.OrderedBooks.Add(orderItem);
        }

        order.Subtotal = subtotal;
        _dataContext.Orders.Add(order);
        if (await _dataContext.SaveChangesAsync() <= 0)
        {
            return Result<OrderDto>.BadRequestResult("Something went wrong. Could not create order");
        }
        
        user.Orders.Add(order);
        await _userManager.UpdateAsync(user);

        var orderDto = _mapper.Map<OrderDto>(order);
        return Result<OrderDto>.DataCreatedResult(orderDto);
    }

    public async Task<Result<OrderDto>> UpdateOrder(string username, int orderId, UpdateOrderDto updateOrderDto)
    {
        throw new NotImplementedException();
    }
}