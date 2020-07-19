const kakaoMapContainer = document.getElementById('kakaoMap');
const kakaoMapOptions = {
    center : new kakao.maps.LatLng(37.484927, 126.970630),
    level : 3
};

const map = new kakao.maps.Map(kakaoMapContainer,kakaoMapOptions);