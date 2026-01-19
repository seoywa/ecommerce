"use client";

import { OPTIONS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { setParam } from "../lib/utils/query";

const Sort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams])
  const selected = searchParams.get('sort') ?? 'features';

  const onChange = (value: string) => {
    const withSort = setParam(pathname, search, 'sort', value);
    const withPageReset = setParam(pathname, new URL(withSort, 'http://dummy').search, 'page', '1')
    router.push(withPageReset, { scroll: false })
  }

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-body text-dark-900">Sort by</span>
      <select
        className="rounded-md border border-light-300 bg-light-100 px-3 py-2 text-body"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort products"
      >
        {OPTIONS.map(o => (
          <option value={o.value} key={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Sort;
