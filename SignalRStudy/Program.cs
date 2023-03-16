
using SignalRStudy.Hubs;
using StackExchange.Redis;

namespace SignalRStudy
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var multiplexer = ConnectionMultiplexer.Connect("localhost:6379");

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);
            builder.Services.AddSignalR();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add CORS options

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed(a => true);
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("ClientPermission");

            app.MapControllers();
            app.MapHub<ChatHub>("/chat/hub");

            app.Run();
        }
    }
}