"use client";

import React, { useEffect, useMemo, useState } from "react";
import Group from "./Group";
import { COLORS, GENDERS, GroupKey, PRICES, SIZES } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getArrayParam,
  removeParams,
  toggleArrayParam,
} from "../lib/utils/query";

const Filter = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const activeCounts = {
    gender: getArrayParam(search, "gender").length,
    size: getArrayParam(search, "size").length,
    color: getArrayParam(search, "color").length,
    price: getArrayParam(search, "price").length,
  };

  const onToggle = (key: GroupKey, value: string) => {
    const url = toggleArrayParam(pathname, search, key, value);
    router.push(url, { scroll: false });
  };

  const clearAll = () => {
    
    const url = removeParams(pathname, search, [
      "gender",
      "size",
      "color",
      "price",
      "page",
    ]);
    router.push(url, { scroll: false });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          className="rounded-md border border-light-300 px-3 py-2 text-body-medium"
          onClick={() => setOpen(true)}
        >
          Filters
        </button>
        <button
          className="text-caption text-dark-700 underline"
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>

      <aside className="sticky top-20 hidden h-fit min-w-60 rounded-lg border border-lime-300 bg-light-100 p-4 md:block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-body-medium text-dark-900">Filters</h3>
          <button
            className="text-caption text-dark-700 underline"
            onClick={clearAll}
          >
            Clear all
          </button>
        </div>

        <Group
          title={`Gender ${
            activeCounts.gender ? `(${activeCounts.gender})` : ""
          }`}
          k="gender"
        >
          <ul className="space-y-2">
            {GENDERS.map((g) => {
              const checked = getArrayParam(search, "gender").includes(g);
              return (
                <li key={g} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`gender-${g}`}
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("gender" as GroupKey, g)}
                  />
                  <label
                    htmlFor={`gender-${g}`}
                    className="text-body text-dark-900"
                  >
                    {g[0].toUpperCase() + g.slice(1)}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group
          title={`Size ${activeCounts.size ? `(${activeCounts.size})` : ""}`}
          k="size"
        >
          <ul className="space-y-2">
            {SIZES.map((s) => {
              const checked = getArrayParam(search, "size").includes(s);
              return (
                <li key={s} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`size-${s}`}
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("size" as GroupKey, s)}
                  />
                  <label
                    htmlFor={`size-${s}`}
                    className="text-body text-dark-900"
                  >
                    {s[0].toUpperCase() + s.slice(1)}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group
          title={`Color ${activeCounts.color ? `(${activeCounts.color})` : ""}`}
          k="color"
        >
          <ul className="space-y-2">
            {COLORS.map((c) => {
              const checked = getArrayParam(search, "color").includes(c);
              return (
                <li key={c} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`color-${c}`}
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("color" as GroupKey, c)}
                  />
                  <label
                    htmlFor={`color-${c}`}
                    className="text-body text-dark-900"
                  >
                    {c[0].toUpperCase() + c.slice(1)}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        <Group
          title={`Price ${activeCounts.price ? `(${activeCounts.price})` : ""}`}
          k="price"
        >
          <ul className="space-y-2">
            {PRICES.map((p) => {
              const checked = getArrayParam(search, "price").includes(p.id);
              return (
                <li key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`price-${p.id}`}
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle("price" as GroupKey, p.id)}
                  />
                  <label
                    htmlFor={`price-${p.id}`}
                    className="text-body text-dark-900"
                  >
                    {p.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[80%] overflow-auto bg-light-100 p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-body-medium">Filters</h3>
              <button className="text-caption text-dark-700 underline">Clear all</button>
            </div>

            <div className="md:hidden">
              <Group
                title='Gender'
                k="gender"
              >
                <ul className="space-y-2">
                  {GENDERS.map((g) => {
                    const checked = getArrayParam(search, "gender").includes(g);
                    return (
                      <li key={g} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`gender-${g}`}
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("gender" as GroupKey, g)}
                        />
                        <label
                          htmlFor={`gender-${g}`}
                          className="text-body text-dark-900"
                        >
                          {g[0].toUpperCase() + g.slice(1)}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group
                title='Size'
                k="size"
              >
                <ul className="space-y-2">
                  {SIZES.map((s) => {
                    const checked = getArrayParam(search, "size").includes(s);
                    return (
                      <li key={s} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`size-${s}`}
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("size" as GroupKey, s)}
                        />
                        <label
                          htmlFor={`size-${s}`}
                          className="text-body text-dark-900"
                        >
                          {s[0].toUpperCase() + s.slice(1)}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group
                title='Color'
                k="color"
              >
                <ul className="space-y-2">
                  {COLORS.map((c) => {
                    const checked = getArrayParam(search, "color").includes(c);
                    return (
                      <li key={c} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`color-${c}`}
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("color" as GroupKey, c)}
                        />
                        <label
                          htmlFor={`color-${c}`}
                          className="text-body text-dark-900"
                        >
                          {c[0].toUpperCase() + c.slice(1)}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>

              <Group
                title='Price'
                k="price"
              >
                <ul className="space-y-2">
                  {PRICES.map((p) => {
                    const checked = getArrayParam(search, "price").includes(
                      p.id
                    );
                    return (
                      <li key={p.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`price-${p.id}`}
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle("price" as GroupKey, p.id)}
                        />
                        <label
                          htmlFor={`price-${p.id}`}
                          className="text-body text-dark-900"
                        >
                          {p.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Group>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
