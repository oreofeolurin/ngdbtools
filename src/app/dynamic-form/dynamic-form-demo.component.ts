import { AfterViewInit, ChangeDetectorRef, Component, Inject, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { RValidators } from '@ngdbtools/core';
import { DynamicFormComponent, DropdownFormControl, TextBoxFormControl, AutoCompleteFormControl, CalenderFormControl, CurrencyFormControl, GroupFormControl, MultipleFormControl, RadioFormControl, UploadFormControl, TableRowFormControl } from '@ngdbtools/dynamic-form';
import { TableFormControl } from 'projects/dynamic-form/src/lib';



@Component({
    selector: 'app-dynamic-form-demo',
    templateUrl: './dynamic-form-demo.component.html',
})
export class DynamicFormDemoComponent implements AfterViewInit {
    @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

    constructor(private cd: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        const sampleData = { creditCardTypeId: 1 };
        //const validators = [RValidators.matchControl('catName', 'verify') as any];
        this.dynamicForm.update(sampleData, this.getFormControls2());
        this.cd.detectChanges();
    }

    public getFormControls() {
        return [
            new TextBoxFormControl({
                key: 'catName',
                label: 'Cat Name',
                placeholder: 'Please put in your cat\'s name',
                column: 12,
                required: true,
            }),
            new TextBoxFormControl({
                key: 'verify',
                label: 'Verify Cat Name',
                placeholder: 'Please put in your cat\'s name',
                column: 12,
            }),


            new DropdownFormControl({
                key: 'creditCardTypeId',
                label: 'Credit Card Type',
                placeholder: 'Please select a credit card Type',
                required: true,
                disabledIfExist: true,
                column: 12,
                options: [
                    { key: 1, value: 'MasterCard' },
                    { key: 2, value: 'VisaCard' }
                ]
            }),

            new DropdownFormControl({
                key: 'catColor',
                label: 'Cat Color',
                placeholder: 'Please select a color for your cat',
                required: true,
                disabledIfExist: true,
                column: 6,
                options: [
                    { key: 0, value: 'Red' },
                    { key: 1, value: 'Blue' }
                ],
                helpText: 'Note that the color of the cat cannot change'
            }),

            new AutoCompleteFormControl({
                key: 'eyeColor',
                label: 'Eye Color',
                placeholder: 'Please select a color for your cat\'s eye',
                required: true,
                column: 6,
                options: [
                    { key: 0, value: 'Gold' },
                    { key: 1, value: 'Black' }
                ]
            }),
        ];

    }

    getFormControls2(options: any = {}) {
        // options = Object.assign({}, options, this.getMonthOptions());

        return [
            new GroupFormControl({
                key: 'personalInformation',
                label: 'Personal Information',
                controls: [
                    new DropdownFormControl({
                        key: 'dayOfSalaryPayment',
                        label: 'Pay Day',
                        placeholder: 'Day salary is paid of every month',
                        required: true,
                        options: Array.from({ length: 31 }, (x, i) => {
                            return { key: ++i, value: i };
                        })
                    }),
                    new TextBoxFormControl({
                        key: 'officeEmail',
                        validators: ['email'],
                        label: 'Office Email',
                        placeholder: 'Office email address',
                        required: true
                    }),
                    new TextBoxFormControl({
                        key: 'nameOfEmployerOrBusiness',
                        label: 'Name of Employer',
                        placeholder: 'Name of your employer or business',
                        hidden: options['isEmployerApproved'],
                        required: !options['isEmployerApproved']
                    }),
                    new TextBoxFormControl({
                        key: 'employerOrBusinessAddress',
                        label: 'Address of Employer',
                        placeholder: 'Address of your employer or business',
                        hidden: options['isEmployerApproved'],
                        required: !options['isEmployerApproved']
                    }),
                    new TextBoxFormControl({
                        key: 'officeTelephone',
                        label: 'Office Telephone No',
                        placeholder: 'Telephone number',
                        hidden: options['isEmployerApproved'],
                        validators: ['phone'],
                        validate: false
                    }),
                    new DropdownFormControl({
                        key: 'sectorCode',
                        label: 'Sector',
                        placeholder: 'Your sector',
                        hidden: options['isEmployerApproved'],
                        required: !options['isEmployerApproved'],
                        options: DropdownFormControl.toDropdownOptions(options['sectors'], 'sectorCode', '[name]')
                    }),
                    new TextBoxFormControl({
                        key: 'ageOfBusinessInYears',
                        label: 'Age of Business (Self Employed)',
                        type: 'number',
                        hidden: options['isEmployerApproved'],
                        placeholder: 'Number of years',
                        validators: ['number']
                    }),
                    new RadioFormControl({
                        key: 'numberOfYearsAtCurrentEmployer',
                        label: 'Years at Employment',
                        placeholder: 'Number of years with current employer',
                        required: true,
                        options: [
                            { key: '1', value: 'Less than 1 Yrs' },
                            { key: '2', value: '2-5 Yrs' },
                            { key: '3', value: '5-10 Yrs' },
                            { key: '4', value: '20 Yrs and more' }
                        ],
                        column: 12
                    }),
                    new TextBoxFormControl({
                        key: 'numberOfYearsOfRetirement',
                        type: 'number',
                        label: 'Number Of Years To Retirement',
                        placeholder: 'Number of years to retirement',
                        required: true,
                        validators: ['number']
                    }),
                    new TextBoxFormControl({
                        key: 'employeeIdNumber',
                        label: 'Employee ID Number',
                        placeholder: 'Your employee id number',
                        required: true
                    }),
                ]
            }),
            new GroupFormControl({
                key: 'customerUploads',
                label: 'Uploads',
                controls: [
                    new UploadFormControl({
                        key: 'staffId',
                        label: 'Staff ID',
                        required: !options['staffId_fileName'],
                        helpText: 'Your company assigned staff id',
                        order: 1,
                        column: 12
                    }),
                    new UploadFormControl({
                        key: 'promotionConfirmation',
                        label: 'Confirmation or Promotion Letter',
                        required: !options['promotionConfirmation_fileName'],
                        helpText: 'Confirmation or Promotion Letter for employed applicants (For Salary earners)',
                        order: 2,
                        column: 12
                    }),
                    new UploadFormControl({
                        key: 'employeeEnquiryForm',
                        label: 'Employee Enquiry Form',
                        required: !options['employeeEnquiryForm_fileName'],
                        helpText: `Your Employee Enquiry Form,
                               <a target="_blank"
                               href="https:/allawee.com/assets/images/presets/employer-enquiry-form.pdf">Click here</a>
                               to download a template`,
                        order: 3,
                        column: 12
                    })
                ]
            }),

            new GroupFormControl({
                key: 'customerMonthlyIncomes',
                label: 'Monthly Salary (Last 3 Months)',
                controls: [
                    new CalenderFormControl({
                        key: 'firstIncomeDate',
                        label: 'Date Salary Received in ' + options['firstMonth'],
                        placeholder: 'Your pay day',
                        min: options['firstMinDate'],
                        max: options['firstMaxDate'],
                        required: true,
                        column: 6
                    }),
                    new CurrencyFormControl({
                        key: 'firstIncomeAmount',
                        label: 'Salary Amount Received in ' + options['firstMonth'],
                        placeholder: 'Your salary amount',
                        required: true,
                        column: 6
                    }),

                    new CalenderFormControl({
                        key: 'secondIncomeDate',
                        label: 'Date Salary Received in ' + options['secondMonth'],
                        placeholder: 'Your pay day',
                        min: options['secondMinDate'],
                        max: options['secondMaxDate'],
                        required: true,
                        column: 6
                    }),
                    new CurrencyFormControl({
                        key: 'secondIncomeAmount',
                        label: 'Salary Amount Received in ' + options['secondMonth'],
                        placeholder: 'Your salary amount',
                        required: true,
                        column: 6
                    }),

                    new CalenderFormControl({
                        key: 'thirdIncomeDate',
                        label: 'Date Salary Received in ' + options['thirdMonth'],
                        placeholder: 'Your pay day',
                        min: options['thirdMinDate'],
                        max: options['thirdMaxDate'],
                        required: true,
                        column: 6
                    }),
                    new CurrencyFormControl({
                        key: 'thirdIncomeAmount',
                        label: 'Salary Amount Received in ' + options['thirdMonth'],
                        placeholder: 'Your salary amount',
                        required: true,
                        column: 6
                    })
                ]
            }),


            new MultipleFormControl({
                key: 'customerOtherIncomes',
                label: 'Other Salary Allowances (optional)',
                controls: [
                    new CalenderFormControl({
                        key: 'incomeDate',
                        label: 'Date',
                        placeholder: 'Your pay day',
                        column: 4
                    }),
                    new CurrencyFormControl({
                        key: 'amount',
                        label: 'Income Amount',
                        placeholder: 'Your income amount',
                        column: 4
                    }),
                    new DropdownFormControl({
                        key: 'frequencyId',
                        label: 'Income Frequency',
                        placeholder: 'Your income frequency',
                        options: [
                            { key: 1, value: 'Monthly' },
                            { key: 2, value: 'Quarterly' },
                            { key: 4, value: 'Annually' }
                        ],
                        column: 4
                    })
                ]
            }),

        ];
    }


    onValueChanges(data: any) {
        console.log(data);
    }

    onSubmit(payload = this.dynamicForm?.getPayload()) {
        console.log(payload);
        this.cd.detectChanges();
    }

    close() {
    }
}
