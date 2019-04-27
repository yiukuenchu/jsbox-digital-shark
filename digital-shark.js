/*

digital-shark.js

author: yiukuenchu

https://github.com/yiukuenchu

此脚本需要配合 JSBox（iOS）使用，用于观测 DigitalOcean Droplet 服务器的情况。

*/

// 将下面 token 更改至你自己的 token
var token = 'YOUR_TOKEN'
// 将下面的 dropletId 更改至你自己想要显示的 dropletId
var dropletId = YOUR_DROPLET_ID

function getAccountInfo(token) {
    $http.get({
        url: "https://api.digitalocean.com/v2/account",
        header:{
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + token,
        },
        body: {},
        handler: function (resp) {
            var data = resp.data;
            var account = data.account;
            $("email").text = "Email: " + account.email;
            $("status").text = "Status: " + account.status;
        }
    })
}

function getDropletInfo(token) {
    $http.get({
        url:"https://api.digitalocean.com/v2/droplets/" + dropletId,
        header:{
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + token,
        },
        body: {},
        handler: function (resp) {
            var data = resp.data;
            var dropletGeneralInfo = data.droplet;
            var dropletNetwokInfo = dropletGeneralInfo.networks;
            var v4Info = dropletNetwokInfo.v4;
            var dropletImage = dropletGeneralInfo.image;
            var dropletRegionInfo = dropletGeneralInfo.region;

            $("droplet_os").text = "# IP: " + v4Info[0].ip_address + "   " + dropletImage.slug;
            $("droplet_id_info").text = dropletGeneralInfo.id;
            $("droplet_name_info").text = dropletGeneralInfo.name;
            if (dropletGeneralInfo.vcpus == 1) {
                $("droplet_cpu_info").text = dropletGeneralInfo.vcpus + " Core";
            } else {
                $("droplet_cpu_info").text = dropletGeneralInfo.vcpus + " Cores";
            }
            $("droplet_memory_info").text = dropletGeneralInfo.memory + " MB";
            if (dropletGeneralInfo.disk == 1) {
                $("droplet_disk_info").text = dropletGeneralInfo.disk + " Disk";
            } else {
                $("droplet_disk_info").text = dropletGeneralInfo.disk + " Disks";
            }
            $("droplet_region_info").text = dropletRegionInfo.name;
        }
    })
}

function renderUI() {
    $ui.render({
        props: {
            title: "DigitalOcean"
        },
        views: [{
            type: "label",
            props:{
                id: "email",
                align: $align.left,
                text: "Email: ",
                font: $font(12),
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props:{
                id: "status",
                align: $align.left,
                text: "Status: ",
                font: $font(12),
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("email").bottom)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet",
                align: $align.left,
                font: $font("bold", 14),
                text: "DROPLET DETAILS",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("status").bottom).offset(30)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_os",
                align: $align.left,
                font: $font("bold", 14),
                text: "# IP: ",
                textColor: $color("#2c2c2c")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet").bottom).offset(15)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_id",
                align: $align.left,
                font: $font(14),
                text: "ID",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_os").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_id_info",
                align: $align.right,
                font: $font(14),
                text: "...",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_os").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_name",
                align: $align.left,
                font: $font(14),
                text: "NAME",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_id").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_name_info",
                align: $align.right,
                font: $font(14),
                text: "...",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_id").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_cpu",
                align: $align.left,
                font: $font(14),
                text: "CPU",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_name").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_cpu_info",
                align: $align.right,
                font: $font(14),
                text: "... Core",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_name").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_memory",
                align: $align.left,
                font: $font(14),
                text: "RAM",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_cpu").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_memory_info",
                align: $align.right,
                font: $font(14),
                text: "... MB",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_cpu").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_disk",
                align: $align.left,
                font: $font(14),
                text: "DISK",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_memory").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_disk_info",
                align: $align.right,
                font: $font(14),
                text: "... Disk",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_memory").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_region",
                align: $align.left,
                font: $font(14),
                text: "REGION",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_disk").bottom).offset(5)
                make.height.equalTo(20)
                make.left.right.equalTo(15)
            }
        },{
            type: "label",
            props: {
                id: "droplet_region_info",
                align: $align.right,
                font: $font(14),
                text: "...",
                textColor: $color("#888888")
            },
            layout: function (make, view) {
                make.top.equalTo($("droplet_disk").bottom).offset(7)
                make.height.equalTo(20)
                make.left.right.inset(15)
            }
        }]
    })
}

function main() {
    renderUI();
    $ui.toast("Refreshing...");
    getAccountInfo(token);
    getDropletInfo(token);
}

main();