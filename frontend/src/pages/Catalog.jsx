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
import { HeroScrollDemo } from '../components/aceternity/HeroScrollDemo';
import CardSection from '../components/aceternity/cardSection';
import CardSection2 from '../components/aceternity/CardSection2';
import CourseCard from '../components/core/Catalog/CourseCard';
import { FeaturesSectionDemo } from '../components/aceternity/FeaturesSectionDemo';

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
                console.log("Printing res: ", res);
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

          {/* <TabsDemo/> */}
        <div className='bg-autumn-secondary-content '>
          {/* Hero Section */}
          <div className=" px-4">
          <div>
            <h1 className='text-center text-6xl text-white font-bold mt-6'>Code<span className='text-red-700 text-7xl'>.</span >Compile<span className='text-red-700 text-7xl'>.</span>Succeed</h1>
            <div class="mt-8 flex justify-center items-center gap-4">
              <div class="h-[1px] w-20 bg-gradient-to-r from-transparent to-red-700"></div>
              <div class="h-2 w-2 rounded-full bg-red-700"></div>
              <div class="h-[1px] w-20 bg-gradient-to-l from-transparent to-red-700"></div>
            </div>
          </div>

          <HeroScrollDemo/>

            <div className="text-center mx-auto flex min-h-[260px] -mt-52 max-w-maxContentTab flex-col max-w-screen-xl px-4 justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-white">
                {`Home / Catalog / `}
                <span className="text-[#7b8fd9]">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-white">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className=" text-white">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>

          <div className='flex justify-center items-center min-h-screen gap-8 bg-gray-950'>
            <CardSection/>
            <CardSection2/>
          </div>


          <FeaturesSectionDemo/>
          
          <div className="h-[10px] w-full bg-black"></div>
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
            Courses to get you started
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
          </div>
            <div className="my-4 flex border-b border-b-white text-md">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-[#617cdf] text-[#617cdf]"
                    : "text-white"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-[#617cdf] text-[#617cdf]"
                    : "text-white"
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
          <div className=" mx-auto box-content text-white w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

          <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
          </div>

            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content text-white w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading text-5xl font-bold text-[#7b8fd9] inline-block relative">
            Frequently Bought
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-[#7b8fd9] blur-sm opacity-60"></span>
          </div>

            <div className="py-8">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {catalogPageData?.data?.mostSellingCourses
      ?.slice(0, 4)
      .map((course, i) => (
        <CourseCard course={course} key={i} Height="h-[400px]" />
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