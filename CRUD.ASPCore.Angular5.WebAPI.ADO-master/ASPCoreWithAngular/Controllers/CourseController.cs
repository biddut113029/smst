using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]
    public class CourseController : Controller
    {
        AssignCourse objcourse = new AssignCourse();

        [HttpGet("[action]")]
        [Route("api/Course/Index")]
        public int Index()
        {
            return 1;
        }


        [HttpPost]
        [Route("api/Course/Create")]
        public int Create([FromBody] Course course)
        {
            return objcourse.AddCourse(course);
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public Course Details(int id)
        {
            return objcourse.GetCourseData(id);
        }

    }
}
