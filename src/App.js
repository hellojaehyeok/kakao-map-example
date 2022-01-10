
import { useEffect, useRef, useState } from 'react';
import {KakaoMap} from '@hellojh/react-kakao-map';
import styled from 'styled-components';
import "./App.css"

function App() {
  // 지도 타입 (normal, satellite)
  const [mapType, setMapType] = useState("normal");
  
  // 오버레이 지도 타입 (traffic, terrain, use_district)
  const [overlayMapType, setOverlayMapType] = useState(null);

  // 지도 레벨 (1 ~ 14)
  const [mapLevel, setMapLevel] = useState(3);

  // 지도 중점 ({lat:-- ,lng:--})
  const [mapCenter, setMapCenter] = useState({lat:37.498, lng:127.028});

  // 현재 위치 (Bool)
  const [isMyLocation, setIsMyLocation] = useState(false);

  // 마커 토글, 마커 위치
  const [makerOption, setMakerOption] = useState({
    makerImg:{
      src:null,
      width:0,
      height:0,
    },
    posArr : [
      {lat:37.499, lng:127.026},
      {lat:37.499, lng:127.027},
    ]
  })
  const [isMarker, setIsMarker] = useState(true);

  // 클러스터러 옵션
  const clustererOption = {
    disableClickZoom:true,
    onClickCenter:(e) => {console.log(e)},
    minLevel:2,
  }

  // 로드뷰 토글
  const [isRoadView, setIsRoadView] = useState(false);
  const roadViewRef = useRef(); 
  const roadBtnRef = useRef(); 


  const onClickZoom = (isZoomIn) => {
    if(isZoomIn){
      if(mapLevel==1){alert("최소 레벨입니다."); return}
      setMapLevel(mapLevel - 1)
    }else{
      if(mapLevel==14){alert("최대 레벨입니다."); return}
      setMapLevel(mapLevel + 1)
    }
  }

  return (
    <Container>
      <ControlBtnWrap>
        <ControlBtn onClick={() => setMapType("normal")}>Map type : normal</ControlBtn>
        <ControlBtn onClick={() => setMapType("satellite")}>Map type : satellite</ControlBtn>
        <ControlBtn onClick={() => setOverlayMapType(null)}>Overlay type : null</ControlBtn>
        <ControlBtn onClick={() => setOverlayMapType("traffic")}>Overlay type : traffic</ControlBtn>
        <ControlBtn onClick={() => setOverlayMapType("terrain")}>Overlay type : terrain</ControlBtn>
        <ControlBtn onClick={() => setOverlayMapType("use_district")}>Overlay type : use_district</ControlBtn>
        <ControlBtn onClick={() => onClickZoom(true)}>Map zoomin</ControlBtn>
        <ControlBtn onClick={() => onClickZoom(false)}>Map zoomout</ControlBtn>
        <ControlBtn onClick={() => setIsMyLocation(true)}>Current location</ControlBtn>
        <ControlBtn onClick={() => setIsMarker(!isMarker)}>Maker toggle</ControlBtn>
      </ControlBtnWrap>

      <KaoKaoMapWrap>
        <KakaoMap 
          mapType={mapType}
          overlayMapType={overlayMapType}
          mapLevel={mapLevel}
          mapCenter={mapCenter}
          isMyLocation={isMyLocation}
          makerOption={makerOption}
          isMarker={isMarker}
          clustererOption={clustererOption}

          // roadViewRef={roadViewRef}
          // roadBtnRef={roadBtnRef}
          // isRoadView={isRoadView}
        />
      </KaoKaoMapWrap>
    </Container>
  );
}

export default App;


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`
const ControlBtnWrap = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ControlBtn = styled.button`
  background-color: transparent;
  padding: 15px;
  border: 1px solid #454545;
  border-radius: 5px;
  margin-bottom: 10px;
`

const KaoKaoMapWrap = styled.div`
  width: 80%;
  height: 100%;
`
