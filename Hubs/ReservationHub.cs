namespace QLKhachSanAPI.Hubs
{
    using Microsoft.AspNetCore.SignalR;

    public class ReservationHub : Hub
    {
        // NOTE: Client will make request all through the Controller !
        // so we dont need this Hub functions below any more, just leave it blank !
        // this Hub is just for initialization & Program.cs deps injection purpose
    }
}
