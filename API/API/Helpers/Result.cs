namespace API.Helpers;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public int StatusCode { get; set; }
    public string? ErrorMessage { get; set; }
    
    public static Result<T> OkResult(T data)
    {
        return new Result<T>()
        {
            Data = data,
            StatusCode = 200,
            IsSuccess = true
        };
    }
    
    public static Result<T> DataCreatedResult(T data)
    {
        return new Result<T>()
        {
            Data = data,
            StatusCode = 201,
            IsSuccess = true
        };
    }
    
    public static Result<T> NotFoundResult(string message)
    {
        return new Result<T>()
        {
            StatusCode = 404,
            ErrorMessage = message,
            IsSuccess = false
        };
    }
    
    public static Result<T> BadRequestResult(string message)
    {
        return new Result<T>()
        {
            StatusCode = 400,
            ErrorMessage = message,
            IsSuccess = false
        };
    }
    
    public static Result<T> NoContentResult()
    {
        return new Result<T>()
        {
            StatusCode = 204,
            IsSuccess = true
        };
    }
}