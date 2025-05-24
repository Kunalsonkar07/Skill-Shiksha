import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"
import { TabsDemo } from '../components/aceternity/TabsDemo';

const Catalog = () => { 

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <div>

          <TabsDemo/>
        <div className='bg-autumn-secondary-content'>
          {/* Hero Section */}
          <div className=" px-4">
          <div>
            <h1 className='text-center text-6xl text-black font-bold mt-6'>Code<span className='text-red-400'>.</span >Compile<span className='text-red-400'>.</span>Succeed</h1>
            <div class="mt-6 flex justify-center items-center gap-4">
              <div class="h-[1px] w-20 bg-gradient-to-r from-transparent to-red-400"></div>
              <div class="h-2 w-2 rounded-full bg-red-400"></div>
              <div class="h-[1px] w-20 bg-gradient-to-l from-transparent to-red-400"></div>
            </div>
          </div>
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-[#000814]">
                {`Home / Catalog / `}
                <span className="text-red-500">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-[#161D29]">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-[#424854]">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>

          <div className="h-[10px] w-full bg-black"></div>
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-2xl text-black font-bold">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-black text-md">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-orange-700 text-orange-700"
                    : "text-black"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-orange-700 text-orange-700"
                    : "text-black"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content text-black w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-2xl font-bold">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content text-black w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-2xl font-bold">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </div>
        </div>
      )
    }
    
    export default Catalog