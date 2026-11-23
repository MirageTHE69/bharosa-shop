'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Loader2, X, ArrowRight, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

interface ProductSuggestion {
  slug: string;
  title: string;
  hindiTitle: string | null;
  imageUrl: string | null;
  price: number;
  weight: string | null;
  vendor: string;
}

interface CategorySuggestion {
  slug: string;
  name: string;
}

interface SearchBoxProps {
  placeholder: string;
  className?: string;
  onNavigate?: () => void;
}

const MIN_CHARS = 2;
const DEBOUNCE_MS = 220;

// Header search: shows instant suggestions while typing; Enter, the search
// button or "See all results" opens the full /search page.
export function SearchBox({ placeholder, className = '', onNavigate }: SearchBoxProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const urlQuery = pathname === '/search' ? searchParams.get('q') ?? '' : '';
  const [query, setQuery] = useState(urlQuery);
  const [syncedUrlQuery, setSyncedUrlQuery] = useState(urlQuery);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductSuggestion[]>([]);
  const [categories, setCategories] = useState<CategorySuggestion[]>([]);
  const [fetchedFor, setFetchedFor] = useState('');
  const [active, setActive] = useState(-1);

  // Keep the box in step with the URL when the user lands on /search?q=… (render-time sync).
  if (urlQuery !== syncedUrlQuery) {
    setSyncedUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  const trimmed = query.trim();

  // Debounced suggestions fetch; stale requests are aborted.
  useEffect(() => {
    if (trimmed.length < MIN_CHARS) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        const data = await res.json();
        setProducts(data.products ?? []);
        setCategories(data.categories ?? []);
        setFetchedFor(trimmed);
        setActive(-1);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setProducts([]);
          setCategories([]);
          setFetchedFor(trimmed);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  // Close when clicking outside.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const showPanel = open && trimmed.length >= MIN_CHARS;
  const ready = fetchedFor === trimmed;
  // Keyboard-navigable rows: products, then categories, then "see all".
  const rows = ready
    ? [
        ...products.map((p) => ({ key: `p-${p.slug}`, href: `/product/${p.slug}` })),
        ...categories.map((c) => ({ key: `c-${c.slug}`, href: `/category/${c.slug}` })),
        { key: 'all', href: `/search?q=${encodeURIComponent(trimmed)}` },
      ]
    : [];

  const go = (href: string) => {
    setOpen(false);
    inputRef.current?.blur();
    onNavigate?.();
    router.push(href);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (active >= 0 && rows[active]) return go(rows[active].href);
    if (!trimmed) return inputRef.current?.focus();
    go(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!rows.length || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    setOpen(true);
    setActive((i) => (e.key === 'ArrowDown' ? (i + 1) % rows.length : (i - 1 + rows.length) % rows.length));
  };

  const rowClass = (i: number) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${i === active ? 'bg-[#EEF5EA]' : 'hover:bg-[#F7F2E7]'}`;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={submit} role="search" className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7263] pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          className="w-full pl-9 pr-20 py-2 rounded-lg bg-white border border-transparent text-sm text-[#24291F] placeholder-[#6B7263] focus:outline-none focus:border-[#C4611E] transition-colors [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-11 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#6B7263] hover:text-[#24291F]"
            aria-label={t('search.clear')}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-[calc(100%-8px)] px-2.5 rounded-md bg-[#2A5C31] hover:bg-[#1F4725] text-white flex items-center justify-center transition-colors"
          aria-label={t('search.submit')}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 sm:right-auto sm:w-[max(100%,28rem)] top-full mt-2 z-50 bg-white rounded-xl border border-[#E7E0CE] shadow-2xl shadow-black/15 p-2 max-h-[70vh] overflow-y-auto text-left"
        >
          {!ready ? (
            <div className="flex items-center gap-2 px-3 py-3 text-sm text-[#6B7263]">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('search.searching')}
            </div>
          ) : (
            <>
              {products.length === 0 && categories.length === 0 && (
                <div className="px-3 py-3 text-sm text-[#6B7263]">
                  {t('search.noMatches')} “{trimmed}”
                </div>
              )}

              {products.length > 0 && (
                <div className="px-3 pt-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7263]">
                  {t('search.products')}
                </div>
              )}
              {products.map((p, i) => (
                <Link key={p.slug} href={`/product/${p.slug}`} onClick={(e) => { e.preventDefault(); go(`/product/${p.slug}`); }} role="option" aria-selected={i === active} className={rowClass(i)}>
                  <img src={p.imageUrl ?? DEFAULT_PRODUCT_IMAGE} alt="" className="w-11 h-11 rounded-lg object-cover bg-[#F4EEE1] shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#24291F] truncate">{p.title}</span>
                    <span className="block text-xs text-[#6B7263] truncate">
                      {[p.weight, p.vendor].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-[#24291F] shrink-0">₹{p.price}</span>
                </Link>
              ))}

              {categories.length > 0 && (
                <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7263]">
                  {t('search.categories')}
                </div>
              )}
              {categories.map((c, j) => {
                const i = products.length + j;
                return (
                  <Link key={c.slug} href={`/category/${c.slug}`} onClick={(e) => { e.preventDefault(); go(`/category/${c.slug}`); }} role="option" aria-selected={i === active} className={rowClass(i)}>
                    <span className="w-8 h-8 rounded-lg bg-[#EEF5EA] text-[#2A5C31] flex items-center justify-center shrink-0">
                      <LayoutGrid className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-medium text-[#24291F]">{c.name}</span>
                  </Link>
                );
              })}

              <Link
                href={`/search?q=${encodeURIComponent(trimmed)}`}
                onClick={(e) => { e.preventDefault(); go(`/search?q=${encodeURIComponent(trimmed)}`); }}
                role="option"
                aria-selected={rows.length - 1 === active}
                className={`${rowClass(rows.length - 1)} mt-1 border-t border-[#E7E0CE] rounded-t-none justify-between text-sm font-semibold text-[#2A5C31]`}
              >
                <span>
                  {t('search.seeAll')} “{trimmed}”
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
