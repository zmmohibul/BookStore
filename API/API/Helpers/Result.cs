namespace API.Helpers;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public int StatusCode { get; set; }
    public string? ErrorMessage { get; set; }
}