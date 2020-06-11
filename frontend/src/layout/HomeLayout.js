import React from 'react'
import {
    Link
  } from "react-router-dom";

const HomeLayout = (props) => {
    return <div className="container">

        <div className="row">

        <div className="col-lg-2">

            <h1 className="my-4">Yumyum </h1>
            <div className="list-group">
                <Link className="list-group-item" to="/">Catégorie 1</Link>
            </div>

        </div>

        <div className="col-lg-10">
        <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
            <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
                <img className="d-block img-fluid" src="https://www.yumyum.sn/upload/images/cache/banner/52/915x170/le-fermier-reboot.png" alt="First slide" />
            </div>

            
            <div className="carousel-item">
                <img className="d-block img-fluid" src="https://www.yumyum.sn/upload/images/cache/banner/52/915x170/le-fermier-reboot.png" alt="Second slide" />
            </div>
            <div className="carousel-item">
                <img className="d-block img-fluid" src="https://www.yumyum.sn/upload/images/cache/banner/52/915x170/le-fermier-reboot.png" alt="Third slide" />
            </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
        </div>

        {props.children}

        </div>

</div>

  


  </div>


}

export default HomeLayout;