
import SliderComponent from "../../component/slide/SliderComponent";
import slider1 from "../../assets/anh-bia-facebook-anime-boy_042004452.jpg"
import slider2 from "../../assets/anh-bia-facebook-anime-lanh-lung-3-800x296.jpg"
import slider3 from "../../assets/anh-bia-facebook-anime_042004650.jpg"
import CardComponent from "../../component/cardcomponent/CardComponent";
import NappaComponent from "../../component/nappacomponent/NappaComponent";

function HomePage() {
    return ( 
  <div className="px-28">
          <SliderComponent arrImg={[slider1 ,slider2 ,slider3]} />
         <CardComponent/>
         <NappaComponent/>

  </div>
     );
}

export default HomePage;