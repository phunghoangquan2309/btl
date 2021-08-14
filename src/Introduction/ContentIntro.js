import React from 'react'
import './contentIntro.css';
import { Link } from 'react-router-dom';
// const linkStyle = {
//     padding: 5px 20px;
//     background: #0078d4;
//     color: white;
//     font-weight: 700;
//     font-size: 1.6rem;
//     border-radius: 2px;
//     box-shadow: 0px 2px 4px -0.7px rgb(0 0 0 / 25%);
//   };
function ContentIntro() {
    return (
        <div id="root">
            <div className="content" id="inner">
                <div className="main">
                    <div className="presentation-left">
                        <img
                            src="https://to-do-cdn.microsoft.com/static-assets/c26cd0d92ec61ba2c661adefaa535ab3cc4fb124f347a850fded8034dad5d360/icons/welcome-left.png"
                            className="image-left"
                            alt
                        />
                    </div>
                    <div
                        className="interaction"
                        role="main"
                        aria-labelledby="headline subheadline"
                    >
                        <div className="interaction-top">
                            <img
                                src="https://i.pinimg.com/564x/52/6a/bf/526abf16cc3e74882fa7304abc0f841c.jpg"
                                className="image-logo"
                                alt
                            />
                            <h1 id="headline">
                                <span className="x-hidden-focus">To Do</span>
                            </h1>
                            <img
                                src="https://to-do-cdn.microsoft.com/static-assets/da7ea2e49739d43b8e3a4d59c6029b078a13f81b18a7b236cd0ebfc41495dfd1/icons/welcome-center.png"
                                className="image-center"
                                alt
                            />
                            <p className="description">
                                <span className="x-hidden-focus1">
                                    To Do mang đến cho bạn sự tập trung, từ công việc cho đến giải
                                    trí.
                                </span>
                            </p>
                        </div>
                        <div className="interaction-signin">
                            <Link to="/login" className="button">Bắt đầu</Link>


                        </div>

                    </div>
                    <div className="presentation-right">
                        <img
                            src="https://to-do-cdn.microsoft.com/static-assets/f2f56b7d4c72910540effed9ccddae703d8d09b94075dddfeeab6cd79def0c60/icons/welcome-right.png"
                            className="image-right"

                            alt
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ContentIntro

