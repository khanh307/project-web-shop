
//---------Cập nhật số sp trong giở;--------------------
function numberSP() {
    var data = JSON.parse(localStorage.getItem('data'));
    var str = '<sup>' + data.length + '</sup>';
    document.getElementById("numberCart").innerHTML = str;

}
//--------------- thêm hàng vào giỏ---------------------
function addItem(x) {
    var boxsp = x.parentElement.parentElement.children;
    var image = boxsp[2].children[0].src;
    var name = boxsp[3].children[0].innerText;
    var price = (boxsp[3].children[2].innerText.replace(/,/g, ""));

    var newItem = {
        'image': image,
        'name': name,
        'price': price
    }

    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }
    var old_data = JSON.parse(localStorage.getItem('data'));


    var matches = 0;
    for (i = 0; i < old_data.length; i++) {
        if (old_data[i] != null)
            if (old_data[i].name == name) {
                matches = 1; break;
            }

    }


    if (matches) {
        alert('Sản phẩm đã có trong giỏ hàng');
    } else {
        old_data.push(newItem);
    }
    localStorage.setItem('data', JSON.stringify(old_data));
    showMyCart();
    numberSP();
}

//-----------------show thông tin giỏ hàng---------------
function showMyCart() {

    if (localStorage.getItem('data') != null) {
        var data = JSON.parse(localStorage.getItem('data'));
        var ttgh = "";
        var tong = 0;

        document.getElementById("show-cart").style.overflow = 'scroll';


        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {

                var name = data[i].name;
                var image = data[i].image;
                var price = data[i].price;
                tong += parseFloat(price);

                ttgh += '<tr>' +
                    '<td class="stt">' + (i + 1) + '</td>' +
                    '<td> <img style="oobject-fit: cover;" src="' + image + '" alt="">' +
                    '<span> <p>' + name + '</p> <p><span class="price">' + price + '</span><sup>đ</sup></p> </span> </td>';



                var thanhtien = parseFloat(price).toLocaleString('de-DE');

                ttgh += '<td class="money" id="thanhtien">' + thanhtien + '</td>' +
                    '<td class="number"><i class="bx bx-trash" onclick="removeCart(' + i + ');";></i></td>' +
                    '</tr>';

            }


        }
        var tong2 = tong.toLocaleString('de-DE');
        ttgh += '<tr>' +
            '<th colspan = 2>Tổng cộng</th>' +
            '<td class="money">' + tong2 + '</td> '
        '</tr>';
        document.getElementById("mycart").innerHTML = ttgh;



    }

}


// ---------------- Show giao diện giỏ hàng-----------------
function showcart() {
    
    var id = document.getElementById("show-cart");
    if (id.style.display == "block") {
        id.style.display = "none";


    } else {
        id.style.display = "block";
        showMyCart();
    }
   

}
// ---------------------------Xóa hàng trong giỏ hàng -----------------
function removeCart(a) {

    if (localStorage.getItem('data') != null) {
        var data = JSON.parse(localStorage.getItem('data'));

        delete data[a];

        localStorage.setItem('data2', '[]')
        var items = JSON.parse(localStorage.getItem('data2'));
        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {
                items.push(data[i]);
            }
        }
        item = JSON.stringify(items);
        localStorage.removeItem(data);
        localStorage.setItem('data', item);
        localStorage.removeItem('data2');
        showMyCart();
        numberSP();
    }

}


// -------------------------------------Script phần yêu thích-----------------
//---------Thêm sp yêu thích---------------
function addHeart(x) {

    var boxsp = x.parentElement.parentElement.children;
    var image = boxsp[2].children[0].src;
    var name = boxsp[3].children[0].innerText;
    var price = (boxsp[3].children[2].innerText);


    var newItem = {
        'image': image,
        'name': name,
        'price': price
    }

    if (localStorage.getItem('data3') == null) {
        localStorage.setItem('data3', '[]');
    }
    var old_data = JSON.parse(localStorage.getItem('data3'));


    var matches = 0;
    for (i = 0; i < old_data.length; i++) {
        if (old_data[i] != null)
            if (old_data[i].name == name) {
                matches = 1; break;
            }

    }


    if (matches) {

        removeHeart(name);
        boxsp[0].style.color = "blue";
        return;
    } else {
        old_data.push(newItem);
        boxsp[0].style.color = "red";
    }
    localStorage.setItem('data3', JSON.stringify(old_data));

    showHeart();
}

// ------------------------Hiển thị sp yêu thích--------------
function showHeart() {
    if (localStorage.getItem('data3') != null) {
        var data = JSON.parse(localStorage.getItem('data3'));
        var ttgh = "";
        document.getElementById("tblHeart").style.overflow = 'scroll';

        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {

                var name = data[i].name;
                var image = data[i].image;
                var price = data[i].price;


                ttgh += '<tr>' +
                    '<td> <img style="object-fit: cover;" src="' + image + '" alt=""> </td>' +
                    '<td> <span> <p>' + name + '</p> <p>' + price + '<sup>đ</sup></p> </span> </td>' +
                    '</tr>';

            }


        }

        document.getElementById("myheart").innerHTML = ttgh;



    }
}
// ---------------------Xóa sp yêu thích--------------------------
function removeHeart(a) {

    if (localStorage.getItem('data3') != null) {
        var data = JSON.parse(localStorage.getItem('data3'));
        var count;
        for (i = 0; i < data.length; i++) {
            if (data[i].name == a) {
                count = i;
            }
        }
        delete data[count];

        localStorage.setItem('data4', '[]')
        var items = JSON.parse(localStorage.getItem('data4'));
        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {
                items.push(data[i]);
            }
        }
        item = JSON.stringify(items);
        localStorage.removeItem(data);
        localStorage.setItem('data3', item);
        localStorage.removeItem('data4');
        showHeart();
    }

}

// -------------------Đổi màu đỏ các sản phẩm đã yêu thích---------
function showRedHeart() {
    var cartItem = document.querySelectorAll(".card");

    if (localStorage.getItem('data3') != null) {
        var data = JSON.parse(localStorage.getItem('data3'));
        for (i = 0; i < cartItem.length; i++) {

            for (j = 0; j < data.length; j++) {

                if (cartItem[i].querySelector("#name").innerHTML == data[j].name) {
                    cartItem[i].querySelector(".icon_heart").style.color = "red";
                    break;
                }
            }
        }
    }
}

// ----------------------------Script phần thanh toán------------------
//-----------------Show các sp bên thanh toán------------------
function showSP() {

    if (localStorage.getItem('data') != null) {
        var data = JSON.parse(localStorage.getItem('data'));
        var ttgh = "";
        var tong = 0;

        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {

                var name = data[i].name;
                var image = data[i].image;
                var price = data[i].price;


                ttgh += '<tr>' +
                    '<td class="input-center">' + (i + 1) + '</td>' +
                    '<td> <img style="oobject-fit: cover;" src="' + image + '" alt="">' +
                    '<span class="name">' + name + '</span> </td>' +
                    '<td class="input-center"><input type="number" id="number" value=1 onchange="total();"></td>' +
                    '<td class="money" id="thanhtien">' + price + '</td>' +
                    '<td style=" text-align: center; font-size: 20px"><i class="bx bx-trash" onclick="removeSP(' + i + ');";></i></td>' +
                    '</tr>';

            }


        }



        document.getElementById("myOder").innerHTML = ttgh;
        document.getElementById("SL").innerHTML = data.length;
       
        total();
        if (data.length == 0){
            var str = "<td colspan=5 ><h1>Hãy chọn thêm hàng vào giỏ hàng</h1></td>";
            document.getElementById("myOder").innerHTML = str;
        }
    }

}
// ------------------------------Xóa sản phẩm------------------
function removeSP(a) {

    if (localStorage.getItem('data') != null) {
        var data = JSON.parse(localStorage.getItem('data'));

        delete data[a];

        localStorage.setItem('data2', '[]')
        var items = JSON.parse(localStorage.getItem('data2'));
        for (i = 0; i < data.length; i++) {
            if (data[i] != null) {
                items.push(data[i]);
            }
        }
        item = JSON.stringify(items);
        localStorage.removeItem(data);
        localStorage.setItem('data', item);
        localStorage.removeItem('data2');
        showSP();
    }

}

// ---------------------Tính tổng tiền khi đổi số lương-----------
function total() {
    var cartItem = document.querySelectorAll("#myOder tr");
    var totalC = 0;
    for (i = 0; i < cartItem.length; i++) {

        var inputValue = cartItem[i].querySelector("#number").value;

        var productPrice = cartItem[i].querySelector("#thanhtien").innerHTML;

        var totalA = parseFloat(inputValue) * parseFloat(productPrice);
        totalC += totalA;

    }
    document.getElementById("Tam").innerHTML = totalC.toLocaleString("de-DE");

    if (totalC < 500000) {
        document.getElementById("Ship").innerHTML = '30.000';
        totalC += 30000;
    } else {
        document.getElementById("Ship").innerHTML = '0';
    }
    totalD = totalC.toLocaleString("de-DE");

    document.getElementById("Sum").innerHTML = totalD;

}

// ----------------------Check sự kiện nút Xác nhận----------
function DatHang(frm) {
    var name = frm.name.value.length;
    var phone = frm.phone.value.length;
    var address = frm.diachi.value.length;
    if (name <= 0) {
        alert("Xin hãy nhập tên");
        frm.name.focus();
        return false;
    }
    var p = /[0-9]/;
    if (phone < 10 || phone > 10 || p.test(frm.phone.value) == false) {
        alert("Xin hãy nhập đúng số điện thoại");
        frm.phone.focus();
        return false;
    }
    if (address < 10) {
        alert("Xin hãy nhập địa chỉ rõ ràng");
        frm.diachi.focus();
        return false;
    }
    alert("Đặt hàng thành công");
    return true;
}

