using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using Procoder.Controllers;
using Procoder.Models;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Linq;



//Arrange

//Act

//Assert
namespace UnitTestProcoder
{
    public class ValueControllerTest
    {
        IRepository repo;
        public ValueControllerTest(IRepository r)
        {
            repo = r;
        }

        [Fact]
        public void IndexReturnsResultWithAJsonOfUsers()
        {
            // Arrange
            var mock = new Mock<IRepository>();
            mock.Setup(repo => repo.GetAllUser()).Returns(GetUsersTest);
            //repo.GetUsers()).Returns(GetTestPhones());
            var controller = new ValuesController(mock.Object);

            // Act
            var result = controller.GetUsers();

            // Assert
            var viewResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<User>>(
                viewResult.Model);
            Assert.Equal(GetUsersTest(), result);
        }

        [Fact]
        public void Test1()
        {
            //Arrange
            int id = 1;
            var mock = new Mock<IRepository>();
            mock.Setup(repo => repo.GetUser(id)).Returns(this.GetUsersTest().FirstOrDefault(p => p.Id == id));
            var controller = new ValuesController(mock.Object);
            //Act
            var result = controller.GetUser(id);
            //Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<User>(viewResult.ViewData.Model);
            Assert.Equal("", model.Name);
            Assert.Equal("", model.LastName);
            Assert.Equal(id, model.Id);
            Assert.Equal("", model.Password);
            Assert.Equal("", model.Email);
            Assert.Equal("", model.avatarImgUrl);

        }

        private JsonResult GetUsersTest()
        {
            var users = new List<User>
           {
               new User{Id=1, Name="Name1", LastName="LastName1", Email="Name1@gmail.com", Password="1", avatarImgUrl=null, mapsId=null },
               new User{Id=2, Name="Name2", LastName="LastName2", Email="Name2@gmail.com", Password="2", avatarImgUrl=null, mapsId=null },
               new User{Id=3, Name="Name3", LastName="LastName3", Email="Name3@gmail.com", Password="3", avatarImgUrl=null, mapsId=null },
            };
            return new JsonResult(users);
        }

    }


}
