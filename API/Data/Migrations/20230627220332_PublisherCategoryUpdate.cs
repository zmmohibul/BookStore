using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class PublisherCategoryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthorPublisher",
                columns: table => new
                {
                    AuthorsWhoseBooksArePublishedByThisPublisherId = table.Column<int>(type: "integer", nullable: false),
                    PublishersWithWhomBooksArePublishedId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorPublisher", x => new { x.AuthorsWhoseBooksArePublishedByThisPublisherId, x.PublishersWithWhomBooksArePublishedId });
                    table.ForeignKey(
                        name: "FK_AuthorPublisher_Authors_AuthorsWhoseBooksArePublishedByThis~",
                        column: x => x.AuthorsWhoseBooksArePublishedByThisPublisherId,
                        principalTable: "Authors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuthorPublisher_Publishers_PublishersWithWhomBooksArePublis~",
                        column: x => x.PublishersWithWhomBooksArePublishedId,
                        principalTable: "Publishers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryPublisher",
                columns: table => new
                {
                    BooksPublishedUnderCategoriesId = table.Column<int>(type: "integer", nullable: false),
                    PublishersWhoPublishedBooksUnderThisCategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryPublisher", x => new { x.BooksPublishedUnderCategoriesId, x.PublishersWhoPublishedBooksUnderThisCategoryId });
                    table.ForeignKey(
                        name: "FK_CategoryPublisher_Categories_BooksPublishedUnderCategoriesId",
                        column: x => x.BooksPublishedUnderCategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryPublisher_Publishers_PublishersWhoPublishedBooksUnd~",
                        column: x => x.PublishersWhoPublishedBooksUnderThisCategoryId,
                        principalTable: "Publishers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthorPublisher_PublishersWithWhomBooksArePublishedId",
                table: "AuthorPublisher",
                column: "PublishersWithWhomBooksArePublishedId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryPublisher_PublishersWhoPublishedBooksUnderThisCateg~",
                table: "CategoryPublisher",
                column: "PublishersWhoPublishedBooksUnderThisCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthorPublisher");

            migrationBuilder.DropTable(
                name: "CategoryPublisher");
        }
    }
}
