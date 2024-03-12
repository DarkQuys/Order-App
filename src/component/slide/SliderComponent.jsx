import Slider from "react-slick";

function SliderComponent({arrImg}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <div className=" ">
            <Slider {...settings}>
                  {arrImg.map((image) => {
                      return (
                          <div className="">
                              <img className="w-[100%] h-56" src={image} alt="slider" />
                          </div>
                      )               
             })}
            </Slider>
        </div>
      );
}

export default SliderComponent;