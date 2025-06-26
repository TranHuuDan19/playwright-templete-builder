import test, { Page, expect, Locator, TestInfo } from "@playwright/test";
import fs from "fs";
import path from "path";

export class WebHelper {
  readonly webPage: Page;

  constructor(webPage: Page) {
    this.webPage = webPage;
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time * 1000);
    });
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async clickByText(text: string, exact: boolean = true): Promise<void> {
    await this.webPage.getByText(text, { exact: exact }).click();
  }

  async rightClickButton(locator: string): Promise<void> {
    await this.webPage.locator(locator).click({ button: "right" });
  }

  async leftClickButton(locator: string): Promise<void> {
    await this.webPage.locator(locator).click({ button: "left" });
  }

  async navigateToUrl(url: string): Promise<void> {
    await this.webPage.goto(url);
  }

  async verifyDragAndDrop(
    source: string,
    target: string,
    verifyText: string
  ): Promise<void> {
    let draggable = await this.webPage.locator(source);
    let droppable = await this.webPage.locator(target);
    await draggable.hover();
    await this.webPage.mouse.down();
    await droppable.hover();
    await this.webPage.mouse.up();
    await expect(droppable).toContainText(verifyText);
  }

  async verifyToolTip(locator: string, hoverText: string): Promise<void> {
    let el = await this.webPage.locator(locator);
    el.hover();
    await expect(el).toContainText(hoverText);
  }

  async assertPageURL(url: string): Promise<void> {
    console.log(`Asserts that page url is ${url}.`);
    await expect(this.webPage).toHaveURL(url);
  }

  async assertPageTitle(title: string): Promise<void> {
    console.log(`Asserts that page title is ${title}.`);
    await expect(this.webPage).toHaveTitle(title);
  }

  async takeFullPageScreenshot(
    imageName: string = `screenshot.png`
  ): Promise<void> {
    await this.webPage.screenshot({ path: `${imageName}`, fullPage: true });
  }
  async takePageScreenshot(
    imageName: string = `screenshot.png`
  ): Promise<void> {
    await this.webPage.screenshot({ path: `${imageName}` });
  }

  async takeScreenshotOfElement(
    locator: string,
    imageName: string = `screenshot.png`
  ): Promise<void> {
    const el = await this.webPage.locator(locator);
    await el.screenshot({ path: `${imageName}` });
  }

  async clipScreenshot(imageName: string = `screenshot.png`): Promise<void> {
    await this.webPage.screenshot({
      path: `${imageName}`,
      clip: { x: 0, y: 0, width: 800, height: 800 },
    });
  }

  async elementContainText(el: Locator, expectedText: string): Promise<void> {
    await expect(el).toContainText(expectedText);
  }

  async elementHasText(el: Locator, expectedText: string): Promise<void> {
    await expect(el).toHaveText(expectedText);
  }

  async elementIsVisible(el: Locator): Promise<void> {
    expect(await el).toBeVisible();
  }

  async elementIsNotVisible(el: Locator): Promise<void> {
    expect(await el).toBeHidden();
  }

  async acceptAlertBox(): Promise<void> {
    console.log(`Handle Alert Box by clicking on Ok button`);
    this.webPage.on("dialog", async (dialog) => dialog.dismiss());
  }

  async acceptConfirmBox(): Promise<void> {
    console.log(`Accept Confirm Box by clicking on Ok button`);
    this.webPage.on("dialog", async (dialog) => dialog.accept());
  }

  async dismissConfirmBox(): Promise<void> {
    console.log(`Dismiss Confirm Box by clicking on Cancel button`);
    this.webPage.on("dialog", async (dialog) => dialog.dismiss());
  }

  async handlePromptBox(txtVal: string): Promise<void> {
    console.log(`Enter text message in Prompt Box and click on Ok button`);
    this.webPage.on("dialog", async (dialog) => dialog.accept(txtVal));
  }

  waitForDialogMessage(page: Page) {
    return new Promise((resolve) => {
      page.on("dialog", (dialog) => {
        resolve(dialog.message());
      });
    });
  }

  async getAlertText(): Promise<string> {
    console.log(`Read text message from Alert box`);
    let dialogMessage: string;
    dialogMessage = await this.waitForDialogMessage(
      this.webPage
    ).then.toString();
    console.log(dialogMessage);
    return dialogMessage;
  }

  async getFrame(frameLocator: string) {
    return this.webPage.frameLocator(frameLocator);
  }

  async getStringFromShadowDom(locator: string): Promise<string> {
    return (await this.webPage.locator(locator).textContent()) as string;
  }

  async downLoadFile(
    locator: string,
    expectedFileName: string,
    savePath: string
  ) {
    //start download
    const [download] = await Promise.all([
      this.webPage.waitForEvent("download"),
      this.webPage.locator(locator).click(),
    ]);

    await download.saveAs(savePath);
    return download;
  }

  async uploadFile(
    filePath: string,
    fileUploadLocator: string,
    uploadBtnLocator: string
  ) {
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filePath} does not exist`);
      throw new Error(`File not found :${filePath}`);
    }
    await this.webPage.setInputFiles(`${fileUploadLocator}`, filePath);
    await this.webPage.locator(`${uploadBtnLocator}`).click();
  }

  async getAttribute(locator: string, attributeName: string): Promise<string> {
    const value = await this.webPage
      .locator(locator)
      .getAttribute(attributeName);
    return value ?? "";
  }

  async getText(locator: string): Promise<string> {
    const value = await this.webPage.locator(locator).textContent();
    return value ?? "";
  }

  async press(key: string): Promise<void> {
    await this.webPage.keyboard.press(key);
  }

  async enterText(el: Locator, value: string) {
    await el.fill(value);
  }

  async setCheckBox(el: Locator, state: boolean | string) {
    const targetState =
      typeof state === "string"
        ? state.toLowerCase() === "on" || state.toLowerCase() === "true"
        : state;

    if (targetState) {
      await el.check();
    } else {
      await el.uncheck();
    }

    await el.isChecked();
  }

  async setRadioButton(el: Locator, value: string) {
    const radio = el.locator(`input[type="radio"][value="${value}"]`);

    if (radio) {
      await radio.check();
      await expect(radio).toBeChecked();
    }
  }

  async setSelectOption(select: Locator, value: string) {
    if (select) {
      await select.selectOption(value);
    }
  }

  async addStep(stepDescription: string, stepFunction: any): Promise<any> {
    return await test.step(stepDescription, stepFunction);
  }

  async attachScreenshot(
    locator: string,
    fileName: string,
    testInfo: TestInfo
  ): Promise<void> {
    const file = testInfo.outputPath(fileName);
    const pathFile = path.dirname(file);
    const pathAttachments = path.join(pathFile, "attachments");
    const attachmentFile = path.join(pathAttachments, fileName);

    const loc = this.webPage.locator(locator);
    const isVisible = await loc.isVisible();

    if (isVisible) {
      const screenshot = await loc.screenshot({ path: file });

      if (!fs.existsSync(pathAttachments)) {
        fs.mkdirSync(pathAttachments, { recursive: true });
      }

      await fs.promises.writeFile(attachmentFile, screenshot);
      await testInfo.attach(fileName, { contentType: "image/png", path: file });
    }
  }
}
