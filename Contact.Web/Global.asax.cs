using System;
using System.Reflection;
using System.Web;
using System.Web.Http;
using CommandR;
using CommandR.WebApi;
using Contact.Domain;
using MediatR;
using SimpleInjector;
using SimpleInjector.Extensions;
using SimpleInjector.Integration.WebApi;

namespace Contact.Web
{
    public class Global : HttpApplication
    {
        private static Container _container;
        private static Assembly[] _assemblies;

        protected void Application_Start(object sender, EventArgs e)
        {
            var lifestyle = new WebApiRequestLifestyle(true);
            _container = new Container();
            _assemblies = new[]
            {
                typeof(Global).Assembly,
                typeof(ContactDb).Assembly,
                typeof(Commander).Assembly,
                typeof(JsonRpcController).Assembly,
            };

            ConfigureServices(lifestyle);
            ConfigureMediator();
            ConfigureCommander();
            ConfigureWebApi(GlobalConfiguration.Configuration);
            _container.Verify();
        }

        private static void ConfigureServices(Lifestyle lifestyle)
        {
            _container.Register<ContactDb>(lifestyle);
        }

        private static void ConfigureMediator()
        {
            _container.RegisterSingle<IMediator>(() => new Mediator(_container.GetInstance, _container.GetAllInstances));
            _container.RegisterManyForOpenGeneric(typeof(IRequestHandler<,>), _assemblies);
            _container.RegisterManyForOpenGeneric(typeof(IAsyncRequestHandler<,>), _assemblies);
            _container.RegisterManyForOpenGeneric(typeof(INotificationHandler<>), _container.RegisterAll, _assemblies);
            _container.RegisterManyForOpenGeneric(typeof(IAsyncNotificationHandler<>), _container.RegisterAll, _assemblies);
        }

        private static void ConfigureWebApi(HttpConfiguration config)
        {
            _container.RegisterWebApiControllers(config, _assemblies);
            config.MapHttpAttributeRoutes();
            config.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(_container);
            config.EnsureInitialized();
        }

        private static void ConfigureCommander()
        {
            Commander.Initialize(_assemblies); //Register all the commands
        }
    };
}