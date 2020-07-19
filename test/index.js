const kakaoMapContainer = document.getElementById('kakaoMap');
const kakaoMapOptions = {
    center : new kakao.maps.LatLng(37.484927, 126.970630),
    level : 9
};

const map = new kakao.maps.Map(kakaoMapContainer,kakaoMapOptions);


/*
*전체공지*스틱코드에 로그인하여 더 많은 코드와 기능을 만나보세요,  http://test.stickode.com:19180/login.html
*/
const locationFinderBtnClick = () => {
    // 위치 검색할 때 검색어를 입력할 인풋 태그
    const locationFinderInput = document.getElementById('locationFinderInput');
    // locationFinderInput에서 검색어만 가지고 옵니다
    const inputTxt = locationFinderInput.value;
    // 빈값 예외 처리
    if(!inputTxt) throw "찾을 위치를 입력해주세요.";
    // 기존에 있던 아이템들을 모두 지워줍니다.
    locationFinderReset();
    // 카카오 맵 장소 검색 시작
    const kakaoPlaceService = new kakao.maps.services.Places(); 
    // 첫번째 파라미터는 검색어,
    // 두번째 파라미터는 콜백 메서드
    kakaoPlaceService.keywordSearch(inputTxt, kakaoPlaceServiceCallBack);
}

/*
*전체공지*스틱코드에 로그인하여 더 많은 코드와 기능을 만나보세요,  http://test.stickode.com:19180/login.html
*/
// 카카오 검색 콜백 함수
const kakaoPlaceServiceCallBack = (data,status,pagination) => {
    if(status == kakao.maps.services.Status.OK){
        // 검색 정보를 넣어줄 리스트
        const locationFinderList = document.getElementById('locationFinderList');
        // 받아온 데이터를 기준으로 반복문을 돌면서 목록을 생성해줍니다
        data.map((item) => {
            // 서버에서 받은 아이템 정보를 파싱해 줍니다.
            const {address_name,place_name,x,y} = item;

            // 목록에 들어갈 엘리먼트를 생성
            const locationFinderItem = document.createElement('li');

            // 리스트에 자식으로 넣어줍니다. 넣을 때 좌표값을 속성 값으로 넣어줘서 관리합니다.
             locationFinderItem.appendChild(document.createTextNode(`${place_name} - ${address_name}`));
            locationFinderItem.setAttribute('x',x);
            locationFinderItem.setAttribute('y',y);

            // 리스트에 아이템 엘리먼트를 자식으로 넣어줍니다.
            locationFinderList.appendChild(locationFinderItem);

            // 클릭 했을때의 클릭 메서드입니다.
            // 파라미터로는 자신을 복제한 엘리먼트가 들어가게 되어 클릭 시 동일한 엘리먼트가
            // 인원 현황 리스트로 들어가게 됩니다.
            locationFinderItem.onclick = () => locationFinderItemClick(locationFinderItem.cloneNode(true));

            // 검색어를 초기화 해 줍니다.
            locationFinderInput.value = "";
            
        });
    }
}

/*
*전체공지*스틱코드에 로그인하여 더 많은 코드와 기능을 만나보세요,  http://test.stickode.com:19180/login.html
*/
// 사용자 추가하기 영역의 아이템 클릭시 
// 해당 지역 정보를 인원 현황으로 옮기는 메서드
// e : 사용자 추가하기에서 클릭 된 엘리먼트의 복제본을 가지고 옵니다.
const locationFinderItemClick = (e) => {
    // 복제된 엘리먼트가 추가될 인원 현황 리스트 엘리먼트
    const userList = document.getElementById('userList');
    userList.appendChild(e);

    // 지도에 마커 찍어 주기

    // kakaoPlaceServiceCallBack 메서드에서 속성값으로 지정했던 위 경도 값을 가져오기
    const x = e.getAttribute('x');
    const y = e.getAttribute('y');

    // 카카오에서 사용하는 형식으로 위경도 값을 변경
    const placePosition = new kakao.maps.LatLng(y,x);

    // 카카오에서 사용하는 마커를 생성해줍니다.
    // map : 마커가 표시될 지도 
    // postion : 마커가 표시될 위치
    const marker = new kakao.maps.Marker({
        map: map,
        position : placePosition,
    });

    // 마커를 지도에 넣어줍니다.
    marker.setMap(map);    

    // 사용자 추가하기에서 만들었던 엘리먼트를 그대로 복사해 왔기 때문에 클릭 이벤트가 남아 있어서 지우는 작업
    e.onclick = null;
}


/*
*전체공지*스틱코드에 로그인하여 더 많은 코드와 기능을 만나보세요,  http://test.stickode.com:19180/login.html
*/
// 사용자 추가하기 아이템 초기화
const locationFinderReset =() => {

    // 삭제할 사용자 목록 리스트를 찾아줍니다.
    const locationFinderList = document.getElementById('locationFinderList');
    
    // 리스트에 자식이 있는 동안은 계속 반복문이 돌게 됩니다.
    while ( locationFinderList.hasChildNodes() ) { 

        // 항상 첫번째 자식을 지웁니다. 즉 모든 자식을 지우게 됩니다.
        locationFinderList.removeChild( locationFinderList.firstChild ); 
    }
}