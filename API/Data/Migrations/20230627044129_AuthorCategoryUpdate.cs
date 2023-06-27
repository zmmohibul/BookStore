using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AuthorCategoryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthorCategory",
                columns: table => new
                {
                    AuthorsWhoWroteBooksOnThisCategoryId = table.Column<int>(type: "integer", nullable: false),
                    WrittenBookCategoriesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorCategory", x => new { x.AuthorsWhoWroteBooksOnThisCategoryId, x.WrittenBookCategoriesId });
                    table.ForeignKey(
                        name: "FK_AuthorCategory_Authors_AuthorsWhoWroteBooksOnThisCategoryId",
                        column: x => x.AuthorsWhoWroteBooksOnThisCategoryId,
                        principalTable: "Authors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuthorCategory_Categories_WrittenBookCategoriesId",
                        column: x => x.WrittenBookCategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthorCategory_WrittenBookCategoriesId",
                table: "AuthorCategory",
                column: "WrittenBookCategoriesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthorCategory");
        }
    }
}
