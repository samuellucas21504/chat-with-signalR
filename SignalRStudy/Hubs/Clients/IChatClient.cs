using SignalRStudy.Models;

namespace SignalRStudy.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);

    }
}
