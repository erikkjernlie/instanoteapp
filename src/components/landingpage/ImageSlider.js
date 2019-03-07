import React from 'react'
import './ImageSlider.scss'
import step1 from '../../assets/images/step1.jpg'
import step2 from '../../assets/images/step2.jpg'
import step3 from '../../assets/images/step3.jpg'

const ImageSlider = () => {
  return (

    <div className="div_body">
      <div id="scene">
        <div id="left-zone">
          <ul className="list">
            <li className="item"><input type="radio" id="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)" name="basic_carousel" defaultValue="The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)"
              defaultChecked="checked" /><label className="label_strawberry" htmlFor="radio_The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)">Step 1</label>
              <div
                className="content content_strawberry">
<img src={step1} className="div__image" alt="step1" />

              </div>
            </li>
            <li className="item"><input type="radio" id="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa." name="basic_carousel" defaultValue="A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa."
            /><label className="label_banana" htmlFor="radio_A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.">Step 2</label>
              <div className="content content_banana">
                <img src={step2} className="div__image" alt="step2" />

              </div>
            </li>
            <li className="item"><input type="radio" id="radio_The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus."
              name="basic_carousel" defaultValue="The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus."
            /><label className="label_apple" htmlFor="radio_The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.">Step 3</label>
              <div
                className="content content_apple">
                <img src={step3} className="div__image" alt="step3" />

              </div>
            </li>
            
          </ul>
        </div>
        <div id="middle-border"></div>
        <div id="right-zone"></div>
      </div>
    </div>
  )
}

export default ImageSlider

