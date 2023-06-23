namespace API.Entities.Identity;

public class Address
{
    public int Id { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string Province { get; set; }
    public string ZipCode { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }
}