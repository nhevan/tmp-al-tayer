define(['jquery', 'underscore', 'backbone', 'base/form-validation', 'base/modules/custom_select_wrapper'], function ($, _, backbone, formValidation, customSelectWrapper) {

    'use strict';
    var modelText;
    function init(container, isCreate) {
        var backboneView = backboneInit();
        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return backboneView;

    }

    function backboneInit() {
        return Backbone.View.extend({
            events: {
                'change #Enquiry_Type': 'checkSelectedEnquiry',
                'change #SelectBrand': 'brandChange',
                'change #SelectEnquiry': 'selectEnquiryChange'
            },
            initialize: function () {
                formValidation.init(this.$el);
                this.checkSelectedEnquiry();
                this.registEvents();
                if ($('#SelectBrand').val() != '0') {
                    $('#SelectBrand').change();
                }
            },

            registEvents: function () {
            },
            selectEnquiryChange: function(element) {
                $('#SelectBrand').val('0').prop('selected', true);
                $("#SelectModel").empty();
                $("#SelectModel").append("<option value=\"0\">" + modelText + "</option>");
                customSelectWrapper.updateSelect($("#SelectBrand"));
                customSelectWrapper.updateSelect($("#SelectModel"));
            },
            brandChange: function (element) {
                var brandId = element.currentTarget.value;
                if (brandId != '0') {
                    var modelIdFromUrl = parseInt($('#modelIdFromUrl').val());
                    var selectedVehicleEnquiry = this.$el.find('#SelectEnquiry').val();

                    var requestOptions = {};
                    if (selectedVehicleEnquiry == 'Pre-Owned') {
                        requestOptions.url = "/FinanceAndInsurance/VehiclePreownedModel";
                    }
                    else {
                        requestOptions.url = "/FinanceAndInsurance/GetNewModel";
                    }
                    requestOptions.type = "POST";
                    requestOptions.data = { BrandId: brandId, lang: $('html').attr('lang') };
                    requestOptions.success = function (StatesList) {
                        $("#SelectModel").empty();
                        $("#SelectModel").append("<option value=\"0\">" + modelText + "</option>");
                        for (var i = 0; i < StatesList.length; i++) {
                            if (StatesList[i].Text != null) {
                                $("#SelectModel").append("<option value=\"" + StatesList[i].Value.ID + "\"" + (modelIdFromUrl == StatesList[i].Value.ID ? " selected>" : ">") + StatesList[i].Text + "</option>");
                            }
                        }
                        $("#SelectModel").attr("data-disabled", false);

                        customSelectWrapper.updateSelect($("#SelectModel"));
                    };
                    requestOptions.error = function (err) {
                        alert(err);
                    };
                    $.ajax(requestOptions);
                } else {
                    $("#SelectModel").empty();
                    $("#SelectModel").append("<option value=\"0\">" + modelText + "</option>");
                    customSelectWrapper.updateSelect($("#SelectBrand"));
                    customSelectWrapper.updateSelect($("#SelectModel"));
                }
            },
            checkSelectedEnquiry: function () {
                var selectedEnquiryType = this.$el.find('#Enquiry_Type').val();
                var siblings = this.$el.find('#Enquiry_Type').parent().siblings();
                siblings.addClass('input-hidden');

                if (selectedEnquiryType == 'Vehicle Enquiry') {
                    for (var i = 0; i < siblings.length; i++) {
                        var textarea = siblings.eq(i).find('textarea');
                        if (!textarea || textarea.length == 0) {
                            siblings.eq(i).removeClass('input-hidden');
                        }
                    }

                    $('input[name="additionalmessage"]').attr('required','required');
                    $('input[name="additionalmessage"]').parent().addClass('is-required') ;
                }
                else {
                    for (var i = 0; i < siblings.length; i++) {
                        var textarea = siblings.eq(i).find('textarea');
                        if (textarea && textarea.length > 0) {
                            siblings.eq(i).removeClass('input-hidden');
                        }
                    }
                    $('input[name="additionalmessage"]').removeAttr('required');
                    $('input[name="additionalmessage"]').parent().removeClass('is-required');
                }
            }
        });
    }
    function preProcess() {
        modelText = $('#selectModelTextHiddenField').val();
        
    }

    return {
        init: function (container, isCreate) {
            preProcess();
            return init(container, isCreate);
            
        }
    };
});
