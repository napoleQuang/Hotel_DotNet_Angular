using QLKhachSanAPI.Models.Domains;

namespace QLKhachSanAPI.Models.DTOs
{
    public class SwitchRoomVM
    {
        public string? IdReservation { get; set; }
        public string IdOldRoom { get; set; }
        public string IdNewRoom { get; set; }
       
    }
}
