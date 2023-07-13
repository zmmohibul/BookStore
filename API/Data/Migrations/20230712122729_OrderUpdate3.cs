using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrderUpdate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Orders",
                newName: "UserAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserAddressId",
                table: "Orders",
                column: "UserAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Address_UserAddressId",
                table: "Orders",
                column: "UserAddressId",
                principalTable: "Address",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Address_UserAddressId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserAddressId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "UserAddressId",
                table: "Orders",
                newName: "AddressId");
        }
    }
}
