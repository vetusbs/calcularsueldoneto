import { $, $$ } from "../../lib/dom";
import { formatNumber } from "../../lib/formatNumber";

export interface Result {
  annualNetSalary: number;
  annualFee: number;
  annualWithholding: number;
  monthlyNetSalary: number;
  monthlyNetSalaryExtra: number;
}

export function updateResult({
  monthlyNetSalary,
  annualNetSalary,
  annualWithholding,
  annualFee,
  monthlyNetSalaryExtra,
}: Result) {
  $("#monthly-net-salary")!.textContent = formatNumber(monthlyNetSalary);
  $("#monthly-net-salary-extra")!.textContent = formatNumber(
    monthlyNetSalaryExtra
  );
  Array.from($$("[data-type='extra']")).forEach(
    (element) =>
      (element!.style.display = monthlyNetSalaryExtra ? "flex" : "none")
  );
  $("#annual-net-salary")!.textContent = formatNumber(annualNetSalary);
  $("#annual-withholding")!.textContent = formatNumber(annualWithholding);
  $("#monthly-withholding")!.textContent = formatNumber(annualWithholding / 12);
  $("#annual-fee")!.textContent = formatNumber(annualFee);
  $("#monthly-fee")!.textContent = formatNumber(annualFee / 12);
}
