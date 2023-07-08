import Form, { getFormInputs } from "../form";
import { updateResult } from "../result";

export default {
  init: ({
    minimal = false,
    embed = false,
  }: { minimal?: boolean; embed?: boolean } = {}) => {
    Form.init({ minimal, embed });
    window.addEventListener("input", () => updateGrossToNet({ minimal }));
  },
};

function updateGrossToNet({ minimal }: { minimal: boolean }) {
  const {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
    disabilityPercentage,
  } = getFormInputs({ minimal });

  postData(annualGrossSalary, "madrid", childrenNumber, babiesNumber).then((data) => {
    console.log(data)
    	
	  const monthlyNetSalary = Number(data.MonthlyNet)
    const annualNetSalary = Number(data.YearlyNet)
    const annualWithholding = Number(data.TotalWithholdings)
    const annualFee = 0
    const monthlyNetSalaryExtra = 0
  
    updateResult({
      monthlyNetSalary,
      annualNetSalary,
      annualWithholding,
      annualFee,
      monthlyNetSalaryExtra,
    });
  }) 
  
}

const postData = async (gross_salary: Number, region: string, children: Number, babies: Number) => {
  var data = { gross_salary: gross_salary, region, children: children, babies: babies}
  
  const response = await fetch('https://api-calcularsueldoneto.fly.dev/netSalary',{
    method: "POST",
    
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const json = await response.json();
  
  return json
}
