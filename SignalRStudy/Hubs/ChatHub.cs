using Microsoft.AspNetCore.SignalR;
using SignalRStudy.Hubs.Clients;

namespace SignalRStudy.Hubs
{
    public class ChatHub : Hub<IChatClient> { }
}
