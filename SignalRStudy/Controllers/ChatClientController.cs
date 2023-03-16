using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRStudy.Hubs;
using SignalRStudy.Hubs.Clients;
using SignalRStudy.Models;
using StackExchange.Redis;

namespace SignalRStudy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        private readonly ILogger<ChatController> _logger;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, ILogger<ChatController> logger)
        {
            _logger = logger;
            _chatHub = chatHub;
        }

        [HttpPost]
        public async Task Post(ChatMessage message)
        {
            await _chatHub.Clients.All.ReceiveMessage(message);
        }
    }
}