using AutoMapper;
using OvrApp.API.Models;

namespace OvrApp.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<OvrApplication, OvrApplication>();
            CreateMap<OvrApplication, RegisterDetailsModel>();
            CreateMap<RegisterDetailsModel, OvrApplication>();
        }
    }

}
