using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities.OrderAggregate;

public class OrderedBook
{
    public OrderedBook()
    {
        
    }

    public OrderedBook(int bookId, string bookName, OrderedBookType bookType, string pictureUrl)
    {
        BookId = bookId;
        BookName = bookName;
        BookType = bookType;
        PictureUrl = pictureUrl;
    }
    
    public int BookId { get; set; }
    public string BookName { get; set; }
    
    [Column(TypeName = "varchar(50)")]
    public OrderedBookType BookType { get; set; }
    public string PictureUrl { get; set; }
}