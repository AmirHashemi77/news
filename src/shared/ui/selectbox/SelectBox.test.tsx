import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import SelectBox from "./SelectBox";

const options = [
  { value: "MALE", label: "مرد" },
  { value: "FEMALE", label: "زن" },
];

test("a new field starts with its disabled placeholder rather than a real choice", () => {
  const $ = load(renderToStaticMarkup(
    <SelectBox name="gender" label="جنسیت" placeholder="انتخاب جنسیت" options={options} />,
  ));

  assert.equal($("label").attr("for"), $("select").attr("id"));
  assert.equal($("select").attr("name"), "gender");
  assert.equal($("option[selected]").attr("value"), "");
  assert.equal($("option[selected]").is(":disabled"), true);
  assert.equal($("option[selected]").text(), "انتخاب جنسیت");
});

test("existing values are displayed using defaultValue or controlled value", () => {
  for (const valueProps of [{ defaultValue: "FEMALE" }, { value: "FEMALE", onChange: () => {} }]) {
    const $ = load(renderToStaticMarkup(
      <SelectBox options={options} placeholder="انتخاب جنسیت" {...valueProps} />,
    ));

    assert.equal($("option[selected]").attr("value"), "FEMALE");
    assert.equal($("option[selected]").text(), "زن");
  }
});

test("validation messages and hints remain connected to the field and external help", () => {
  const $ = load(renderToStaticMarkup(
    <SelectBox
      id="gender"
      options={options}
      hint="یکی از گزینه‌ها را انتخاب کنید"
      error="جنسیت را انتخاب کنید"
      aria-invalid={false}
      aria-describedby="external-help"
    />,
  ));

  assert.equal($("select").attr("aria-invalid"), "true");
  assert.deepEqual($("select").attr("aria-describedby")?.split(" "), ["external-help", "gender-hint", "gender-error"]);
  assert.equal($("#gender-error").attr("role"), "alert");
  assert.equal($("#gender-error").text(), "جنسیت را انتخاب کنید");
  assert.equal($("#gender-hint").text(), "یکی از گزینه‌ها را انتخاب کنید");
});

test("native form attributes, disabled choices and text direction are preserved", () => {
  const $ = load(renderToStaticMarkup(
    <SelectBox
      name="category"
      form="filters"
      required
      disabled
      dir="ltr"
      options={[{ value: "sport", label: "Sport", disabled: true }, { value: "world", label: "World" }]}
    />,
  ));

  assert.equal($("select").attr("form"), "filters");
  assert.equal($("select").is(":disabled"), true);
  assert.equal($("select").is("[required]"), true);
  assert.equal($("select").attr("dir"), "ltr");
  assert.equal($("option[value=sport]").is(":disabled"), true);
  assert.equal($("option[value=world]").is(":disabled"), false);
});

test("unnamed fields get unique IDs linked to their labels and errors", () => {
  const $ = load(renderToStaticMarkup(
    <>
      <SelectBox label="اول" options={options} error="خطای اول" />
      <SelectBox label="دوم" options={options} error="خطای دوم" />
    </>,
  ));
  const ids = $("select").toArray().map((select) => $(select).attr("id"));

  assert.equal(new Set(ids).size, 2);
  $("select").each((index, select) => {
    assert.equal($("label").eq(index).attr("for"), $(select).attr("id"));
    assert.equal($(select).attr("aria-describedby"), $("[role=alert]").eq(index).attr("id"));
  });
});
