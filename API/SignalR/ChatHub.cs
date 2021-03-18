using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);
            
            //Each Activity wil have its own group.
            //This method will be executed, parse back the comment value. 
            //Any clients who are connected to group with activityid will recive that comment if
            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }
        public override async Task OnConnectedAsync()
        {
            //Getting ActivityId from query string.
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            //Adding connection to activity group
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });

            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}