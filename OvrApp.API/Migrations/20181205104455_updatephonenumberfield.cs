using Microsoft.EntityFrameworkCore.Migrations;

namespace OvrApp.API.Migrations
{
    public partial class updatephonenumberfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DaytimePhone",
                table: "OvrApplications",
                maxLength: 12,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 7,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DaytimePhone",
                table: "OvrApplications",
                maxLength: 7,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 12,
                oldNullable: true);
        }
    }
}
