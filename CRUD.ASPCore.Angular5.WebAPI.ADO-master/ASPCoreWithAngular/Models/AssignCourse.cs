using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Models
{
    public class AssignCourse
    {


        string connectionString = "Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=myTestDB;Data Source=DESKTOP-7V61I4R";

     
        //To Add new course record 
        public int AddCourse(Course course)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddcourse", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Name", course.Name);
                    cmd.Parameters.AddWithValue("@Gender", course.Gender);
                    cmd.Parameters.AddWithValue("@Department", course.Department);
                    cmd.Parameters.AddWithValue("@City", course.City);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }


        public Course GetCourseData(int id)
        {
            try
            {
                Course course = new Course();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM tblcourse WHERE courseID= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        course.ID = Convert.ToInt32(rdr["courseID"]);
                        course.Name = rdr["Name"].ToString();
                        course.Gender = rdr["Gender"].ToString();
                        course.Department = rdr["Department"].ToString();
                        course.City = rdr["City"].ToString();
                    }
                }
                return course;
            }
            catch
            {
                throw;
            }
        }

    }
}
