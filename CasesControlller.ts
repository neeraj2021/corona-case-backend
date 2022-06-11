import "reflect-metadata";
import { JsonController, Param, Get } from "routing-controllers";
import Puppeteer from "puppeteer";
import fs from "fs";

async function getCountryData() {
  const browser = await Puppeteer.launch();

  const page = await browser.newPage();
  await page.goto("https://www.mohfw.gov.in/");

  const countryTodayData = await page.$$eval(
    "#site-dashboard > div > div > div:nth-child(1) > div.col-xs-8.site-stats-count > ul > li > span",
    (pt) => {
      return pt.map((x) => x.textContent);
    }
  );

  const countryTodayDataRes = [];
  for (let i = 0; i < countryTodayData.length; i = i + 3) {
    let obj = {
      status: countryTodayData[i],
      patientInPercent: countryTodayData[i + 1]?.slice(1, -2),
      patientInNumber: countryTodayData[i + 2]?.slice(0, -1)?.split("("),
    };
    countryTodayDataRes.push(obj);
  }

  return countryTodayDataRes;
}

async function stateWise() {
  const browser = await Puppeteer.launch();

  const page = await browser.newPage();
  await page.goto("https://www.mohfw.gov.in/");

  const stateWiseData = await page.$$eval(
    "#state-data > div > div > div > div > table > tbody > tr > td",
    (pt) => {
      return pt.map((x) => x.textContent);
    }
  );

  const stateWiseDataRes = [];

  for (let i = 0; i < 360; i = i + 10) {
    let obj = {
      sno: stateWiseData[i],
      stateName: stateWiseData[i + 1],
      activeCases: stateWiseData[i + 2],
      activeChangeSinceYesterday: stateWiseData[i + 3],
      curedCases: stateWiseData[i + 4],
      curedChangeSinceYesterday: stateWiseData[i + 5],
      deathCases: stateWiseData[i + 6],
      deathDuringDay: stateWiseData[i + 7],
      deathReconciled: stateWiseData[i + 8],
      deathTotal: stateWiseData[i + 9],
    };
    stateWiseDataRes.push(obj);
  }
  // fs.writeFile(
  //   "../corona-case-tracking/images/state.js",
  //   JSON.stringify(stateWiseDataRes),
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("File written successfully\n");
  //     }
  //   }
  // );
  return stateWiseDataRes;
}

@JsonController()
export class CasesController {
  @Get("/country")
  async getAll() {
    return getCountryData();
  }
  @Get("/state")
  async getText() {
    return await stateWise();
  }
}
