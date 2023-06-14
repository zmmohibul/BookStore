using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixAuthorEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Author_AuthorPicture_AuthorPictureId",
                table: "Author");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorPictureId",
                table: "Author",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Author_AuthorPicture_AuthorPictureId",
                table: "Author",
                column: "AuthorPictureId",
                principalTable: "AuthorPicture",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Author_AuthorPicture_AuthorPictureId",
                table: "Author");

            migrationBuilder.AlterColumn<int>(
                name: "AuthorPictureId",
                table: "Author",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Author_AuthorPicture_AuthorPictureId",
                table: "Author",
                column: "AuthorPictureId",
                principalTable: "AuthorPicture",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
