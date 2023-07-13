using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrderUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserAddress_City",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserAddress_Province",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserAddress_Street",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserAddress_ZipCode",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "UserAddress_City",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserAddress_Province",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserAddress_Street",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserAddress_ZipCode",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
