using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Procoder.Migrations
{
    public partial class ProcoderDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "maps",
                columns: table => new
                {
                    map_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    map_category = table.Column<string>(nullable: true),
                    status = table.Column<string>(nullable: true),
                    map_name = table.Column<string>(nullable: true),
                    create_data = table.Column<DateTime>(nullable: false),
                    last_edit = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_maps", x => x.map_id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    user_name = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    avatar_img = table.Column<string>(nullable: true),
                    user_mail = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    date_registration = table.Column<DateTime>(nullable: false),
                    is_email_valid = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "node_data",
                columns: table => new
                {
                    node_id = table.Column<string>(nullable: false),
                    pre_node_numb = table.Column<string>(nullable: true),
                    node_content = table.Column<string>(nullable: true),
                    MapId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_node_data", x => x.node_id);
                    table.ForeignKey(
                        name: "FK_node_data_maps_MapId",
                        column: x => x.MapId,
                        principalTable: "maps",
                        principalColumn: "map_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "snippets",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    snippet = table.Column<string>(nullable: true),
                    NodesId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_snippets", x => x.id);
                    table.ForeignKey(
                        name: "FK_snippets_node_data_NodesId",
                        column: x => x.NodesId,
                        principalTable: "node_data",
                        principalColumn: "node_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_node_data_MapId",
                table: "node_data",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_snippets_NodesId",
                table: "snippets",
                column: "NodesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "snippets");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "node_data");

            migrationBuilder.DropTable(
                name: "maps");
        }
    }
}
