function show_sub(v) {
    if (v == '药品') {
        document.getElementById('panel1').style.display = 'block';
        document.getElementById('panel2').style.display = 'none';
        document.getElementById('panel3').style.display = 'none';
    } else if (v == '诊疗') {
        document.getElementById('panel2').style.display = 'block';
        document.getElementById('panel1').style.display = 'none';
        document.getElementById('panel3').style.display = 'none';
    } else if (v == '材料') {
        document.getElementById('panel1').style.display = 'none';
        document.getElementById('panel2').style.display = 'none';
        document.getElementById('panel3').style.display = 'block';
    }
}
$(function() {
            var flag = true;
            $('.navbar-brand').click(function() {
                if (flag) {
                    $("#aside").animate({
                        marginLeft: '-180px'
                    });
                    $(".main").animate({
                        marginLeft: '0px'
                    });
                    flag = false;
                } else {
                    $("#aside").animate({
                        marginLeft: '0px'
                    });
                    $(".main").animate({
                        marginLeft: '180px'
                    });
                    flag = true;
                }

            })
            $('#myModal4').on('shown.bs.modal', function() { //提示框显示时候触发
                uploader.refresh(); //刷新当前webUploder
            });
            var uploader = WebUploader.create({

                // swf文件路径
                swf: '../assets/js/Uploader.swf',

                // 文件接收服务端。
                server: 'http://webuploader.duapp.com/server/fileupload.php',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#picker',

                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                chunked: true, // 是否分片
                duplicate: true, //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.

            });
            uploader.on('fileQueued', function(file) {
                $("#thelist").append('<div id="' + file.id + '" class="item" style="position:relative">' +

                    '<div class="am-badge" style="float:left;">' + file.name + '</div>' + '<div class="fa fa-close fileRemove" style="float:right;    cursor: pointer"></div>' + '</br>' +

                    '<p class="state">等待上传...</p>' +

                    '</div>');
                //点击删除按钮此行删除
                $('.fileRemove').click(function() {
                        $(this).parent().remove()
                    })
                    // 文件上传过程中创建进度条实时显示。
                uploader.on('uploadProgress', function(file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress .progress-bar');

                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<div class="progress progress-striped active">' +
                            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                            '</div>' +
                            '</div>').appendTo($li).find('.progress-bar');
                    }

                    $li.find('p.state').text('上传中');

                    $percent.css('width', percentage * 100 + '%');
                });
            });
            uploader.on('uploadSuccess', function(file) {
                $('#' + file.id).find('p.state').text('已上传');
            });

            uploader.on('uploadError', function(file) {
                $('#' + file.id).find('p.state').text('上传出错');
                $('#' + file.id).find('p.state').append('<div style="color:red ;font-size:13px">具体哪边错误，请手动添加</div>');
            });

            uploader.on('uploadComplete', function(file) {
                $('#' + file.id).find('.progress').fadeOut();
            })
            $("#ctlBtn").click(function() {
                uploader.upload();
                var parameter = {
                    "imptype": 13,
                }
                $.ajax({
                    type: "post",
                    data: parameter,
                    url: 'http://' + domainName + ":9090/datasrv/importData",
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        console.log(result)
                    }
                });
            });
            /*  $('#fileClose').click(function() {
                  $('.item').remove()
              })
              $('#modelClose').click(function() {
                      $('.item').remove()
                  })*/
            //查询药店列表
            var pageIndex = 1;
            var medicineInfo = {
                "pageIndex": pageIndex,
                "recordCount": 5,
                "criteria": {
                    "generalName": ""
                }
            }
            var html;
            $.ajax({
                        url: 'http://' + domainName + ":9090/service/queryMedicine",
                        type: "post",
                        data: JSON.stringify(medicineInfo),
                        contentType: 'application/json;charset=UTF-8',
                        success: function(result) {
                            console.log(result)
                            for (var i = 0; i < result.data.length; i++) {
                                html += '<tr>' +
                                    '<td>' + result.data[i].id +
                                    '</td>' +
                                    '<td>' + result.data[i].categoryCode +
                                    '</td>' +
                                    '<td>' + result.data[i].generalCode +
                                    '</td>' +
                                    '<td>' + result.data[i].ogeneralCode +
                                    '</td>' +
                                    '<td>' + result.data[i].generalName +
                                    '</td>' +
                                    '<td>' + '<a class="btn btn-success detail" data-toggle="modal" data-target="#detail" style="outline: none;" >查看</a>' +
                                    '</td>' +
                                    '<input type="hidden"  id=' + result.data[i].id + '>' +
                                    '</tr>'
                            }
                            $('#medicalTb tbody').append(html)
                                //查询药店明细
                            var id;
                            $('.detail').click(function() {
                                    id = $(this).parent().next().attr("id")
                                    $.ajax({
                                        type: "post",
                                        url: 'http://' + domainName + ":9090/service/detailMedicine",
                                        async: true,
                                        data: {
                                            "id": id
                                        },
                                        success: function(result) {
                                            console.log(result)
                                            $('#medicalId').val(result.id); //序号
                                            $('#medicalCategoryCode').val(result.categoryCode); //分类编码
                                            $('#medicalGeneralCode').val(result.generalCode); //药品通用名编码
                                            $('#medicalOgeneralCode').val(result.ogeneralCode); //原药品通用名编码
                                            $('#medicalGeneralName').val(result.generalName); //中文通用名
                                            $('#medicalPaymentType').val(result.paymentType); //支付类别
                                            $('#medicalMarkDosage').val(result.markDosage); //标注剂型
                                            $('#medicalProductCode').val(result.productCode); //产品名编码
                                            $('#medicalMedicalRatio').val(result.medicalRatio); //基本医疗自付比例
                                            $('#medicalOverallRatio').val(result.overallRatio); //居民统筹自付比例
                                            $('#medicalRetireRatio').val(result.retireRatio); //离休自付比列
                                            $('#medicalInjuryRatio').val(result.injuryRatio); //工伤保险自付比例
                                            $('#medicalBirthRatio').val(result.birthRatio); //生育保险自付比例
                                            $('#medicalProductName').val(result.productName); //产品名称
                                            $('#medicalCommercialName').val(result.commercialName); //商品名
                                            $('#medicalDosage').val(result.dosage); //剂型
                                            $('#medicalSpecs').val(result.specs); //规格
                                            $('#medicalPackMaterial').val(result.packMaterial); //包装材质
                                            $('#medicalMinPackVolume').val(result.minPackVolume); //最小包装数量（转换比）
                                            $('#medicalUnit').val(result.unit); //单位
                                            $('#medicalIsOtc').val(result.isOtc); //是否OTC
                                            $('#medicalIsBase').val(result.isBase); //是否基药
                                            $('#medicalMarkPrice').val(result.markPrice); //低价药标识
                                            $('#medicalGovPrice').val(result.govPrice); //政府定价
                                            $('#medicalProcurePrice').val(result.procurePrice); //省集中采购上限价
                                            $('#medicalOfficialNumber').val(result.officialNumber); //药品批准文号
                                            $('#medicalSupplier').val(result.supplier); //供应商   			
                                            $('#medicalManufacturer').val(result.manufacturer); //生产企业
                                            $('#medicalPaymentScope').val(result.paymentScope); //限定支付范围
                                            $('#medicalCatalogNumber').val(result.catalogNumber); //省目录编号
                                            $('#medicalReportingNumber').val(result.reportingNumber); //招标申报编号
                                            $('#medicalVariationType').val(result.variationType); //变更类型
                                            $('#medicalVariationCause').val(result.variationCause); //变更原因   			
                                        }
                                    });

                                    $('.editOne').click(function() {
                                        $('.saveOne').removeAttr('disabled');
                                        $('.disabledInput').removeAttr('readonly');
                                        $('.saveOne').click(function() {

                                            $('.disabledInput').attr({
                                                'readonly': 'true'
                                            });
                                            //      			$('.saveOne').attr({         
                                            //       			 'disabled': 'disabled',
                                            //      			
                                            //       		 });
                                            var formData = $('#formInformation1').serialize();
                                            $.ajax({
                                                type: "post",
                                                url: 'http://' + domainName + ":9090/service/modifyMedicine",
                                                async: true,
                                                data: formData,
                                                success: function(result) {
                                                    console.log()
                                                }

                                            })
                                        })

                                    })
                                })
                                //查询诊疗列表
                            var DiagnosisInfo = {
                                "pageIndex": pageIndex,
                                "recordCount": 5,
                                "criteria": {
                                    "generalName": ""
                                }
                            }
                            var html2;
                            $.ajax({
                                    url: 'http://' + domainName + ":9090/service/queryDiagnosis",
                                    type: "post",
                                    data: JSON.stringify(DiagnosisInfo),
                                    contentType: 'application/json;charset=UTF-8',
                                    success: function(result) {
                                        console.log(result)
                                        for (var i = 0; i < result.data.length; i++) {
                                            html2 += '<tr>' +
                                                '<td>' + result.data[i].id +
                                                '</td>' +
                                                '<td>' + result.data[i].chargeCode +
                                                '</td>' +
                                                '<td>' + result.data[i].chargeName +
                                                '</td>' +
                                                '<td>' + '<a class="btn btn-success" data-toggle="modal" data-target="#detail2" style="outline: none;">查看</a>' +
                                                '</td>' +
                                                '</tr>'

                                        }
                                        $('#DiagnosisId tbody').append(html2)

                                    }
                                })
                                //查询材料列表
                            var ClinicalInfo = {
                                "pageIndex": pageIndex,
                                "recordCount": 5,
                                "criteria": {
                                    "generalName": ""
                                }
                            }
                            var html3;
                            $.ajax({
                                    url: 'http://' + domainName + ":9090/service/queryClinical",
                                    type: "post",
                                    data: JSON.stringify(ClinicalInfo),
                                    contentType: 'application/json;charset=UTF-8',
                                    success: function(result) {
                                        console.log(result)
                                        for (var i = 0; i < result.data.length; i++) {
                                            html3 += '<tr>' +
                                                '<td>' + result.data[i].id +
                                                '</td>' +
                                                '<td>' + result.data[i].materialCode +
                                                '</td>' +
                                                '<td>' + result.data[i].materialName +
                                                '</td>' +
                                                '<td>' + '<a class="btn btn-success" data-toggle="modal" data-target="#detail3" style="outline: none;">查看</a>' +
                                                '</td>' +
                                                '</tr>'

                                        }
                                        $('#ClinicalId tbody').append(html3)

                                    }
                                })
                                /* 药品编辑 */

                            $('.closeOne').click(function() {
                                $('.disabledInput').attr({
                                    'readonly': 'true'
                                });
                                $('.saveOne').attr('disabled', true);
                            })

                            $('.editTwo').click(function() {
                                $('.saveTwo').removeAttr('disabled');
                                $('.disabledInput').removeAttr('readonly');
                                $('.editTwo').val('保存')
                            })
                            $('.saveTwo').click(function() {
                                $('.disabledInput').attr({
                                    'readonly': 'true'
                                });
                                $('.saveTwo').attr('disabled', true);

                            })
                            $('.editThree').click(function() {
                                $('.saveThree').removeAttr('disabled');
                                $('.disabledInput').removeAttr('readonly');
                            })
                            $('.saveThree').click(function() {
                                $('.disabledInput').attr({
                                    'readonly': 'true'
                                });
                                $('.saveThree').attr('disabled', true);

                            })
                        })