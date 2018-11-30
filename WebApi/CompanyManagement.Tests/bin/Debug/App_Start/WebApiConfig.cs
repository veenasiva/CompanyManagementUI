using System.Web.Http;
using Unity;
using CompanyManagement.Repository;
using CompanyManagement.Models;

namespace CompanyManagement
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Initialise unity container
            var container = new UnityContainer();
            container.RegisterType<ICompanyRepository, CompanyRepository>();
            //Set dependency resolver
            config.DependencyResolver = new UnityResolver(container);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
