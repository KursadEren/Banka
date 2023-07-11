--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    fullname character varying(30) NOT NULL,
    telno character varying(18) NOT NULL,
    tcno character varying(11) NOT NULL,
    password character varying(18) NOT NULL,
    email character varying NOT NULL,
    dogumtarih character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: Users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN userid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_userid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: doviz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doviz (
    doviztipiid integer NOT NULL,
    dovizadi character varying
);


ALTER TABLE public.doviz OWNER TO postgres;

--
-- Name: doviz_doviztipiid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.doviz ALTER COLUMN doviztipiid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.doviz_doviztipiid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: hesaptur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hesaptur (
    hesapturid integer NOT NULL,
    hesapturadi character varying(10) NOT NULL
);


ALTER TABLE public.hesaptur OWNER TO postgres;

--
-- Name: hesaptur_hesapturid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.hesaptur ALTER COLUMN hesapturid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hesaptur_hesapturid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: islem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.islem (
    islemid integer NOT NULL,
    satilanparatutari character varying NOT NULL,
    alinacakparatutari character varying NOT NULL,
    tarih date NOT NULL,
    usersid integer NOT NULL,
    alinanparatipi character varying NOT NULL,
    satilanparatipi character varying NOT NULL,
    satildigikur character varying NOT NULL,
    alimsatim character varying NOT NULL
);


ALTER TABLE public.islem OWNER TO postgres;

--
-- Name: işlem_islemid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.islem ALTER COLUMN islemid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."işlem_islemid_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sube; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sube (
    subeid integer NOT NULL,
    subeadi character varying,
    subekodu character varying
);


ALTER TABLE public.sube OWNER TO postgres;

--
-- Name: sube_subeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sube ALTER COLUMN subeid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sube_subeid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usershesap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usershesap (
    usershesapid integer NOT NULL,
    usersid integer NOT NULL,
    hesapturid integer NOT NULL,
    hesapno bigint NOT NULL,
    subeid integer NOT NULL,
    doviztipiid integer NOT NULL,
    iban character varying NOT NULL,
    hesapbakiye numeric
);


ALTER TABLE public.usershesap OWNER TO postgres;

--
-- Name: usershesap_hesapno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usershesap ALTER COLUMN hesapno ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usershesap_hesapno_seq
    START WITH 1000000
    INCREMENT BY 1
    MINVALUE 1000000
    NO MAXVALUE
    CACHE 100
);


--
-- Name: usershesap_userhesapid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usershesap ALTER COLUMN usershesapid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usershesap_userhesapid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: doviz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doviz (doviztipiid, dovizadi) FROM stdin;
1	Türk Lirası
2	Amerikan Doları
3	İsviçre Frangı
4	İngiliz Sterlini
5	Euro
\.


--
-- Data for Name: hesaptur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hesaptur (hesapturid, hesapturadi) FROM stdin;
5	Vadeli
6	Vadesiz
\.


--
-- Data for Name: islem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.islem (islemid, satilanparatutari, alinacakparatutari, tarih, usersid, alinanparatipi, satilanparatipi, satildigikur, alimsatim) FROM stdin;
462	100	2307	2023-06-17	73	2	1	23.07	Satış
467	20	479.4	2023-06-17	73	2	1	23.97	Satış
472	100	2384	2023-06-17	73	2	1	23.84	Alım
476	100	2374	2023-06-17	73	2	1	23.74	Alım
481	10000	251300	2023-06-17	73	3	1	25.13	Alım
485	10000	233299.99999999997	2023-06-17	73	2	1	23.33	Satış
489	10000	234400	2023-06-17	73	2	1	23.44	Satış
493	10000	254000	2023-06-17	73	3	1	25.40	Alım
494	10000	258000	2023-06-17	73	5	1	25.80	Satış
498	100	0	2023-06-18	73	3	0	25.05	Sell
503	119790	2994750	2023-06-18	73	3	1	25.00	Alış
507	1000	29480	2023-06-18	73	4	1	29.48	Buy
511	9	212.67	2023-06-19	73	2	1	23.63	Satış
516	10	232	2023-06-19	73	2	1	23.20	Satış
520	10	237.10000000000002	2023-06-19	73	2	1	23.71	Satış
524	200	4650	2023-06-19	73	2	1	23.25	Sell
525	200	4762	2023-06-19	73	2	1	23.81	Sell
526	100	0	2023-06-19	73	2	0	23.57	Satış
531	10	9.404339250493097	2023-06-19	73	2	5	23.84	Satış
532	10	10.846740050804403	2023-06-19	73	2	5	23.62	Alış
537	100	2352	2023-06-20	73	2	1	23.52	Satış
541	1000	25570	2023-06-21	73	3	1	25.57	Satış
543	12	0	2023-06-22	73	2	0	23.98	Satış
547	1058	1067.2622363708715	2023-06-29	73	3	5	25.13	Alış
551	150	3804	2023-07-01	73	5	1	25.36	Alış
555	10	251	2023-07-10	73	3	1	25.10	Satış
463	100	2370	2023-06-17	73	2	1	23.70	Satış
469	25	591	2023-06-17	73	2	1	23.64	Satış
473	100	2352	2023-06-17	73	2	1	23.52	Alım
477	100	2304	2023-06-17	73	2	1	23.04	Satış
482	5000	4949.297971918876	2023-06-17	73	3	5	25.64	Alım
486	10000	238700	2023-06-17	73	2	1	23.87	Satış
490	10000	239000	2023-06-17	73	2	1	23.90	Satış
495	90000	2294100	2023-06-17	73	5	1	25.49	Satış
499	10	258.2	2023-06-18	73	3	1	25.82	Sell
504	239580	6126060.6	2023-06-18	73	3	1	25.57	Alış
508	10	298.7	2023-06-18	73	4	1	29.87	Sell
512	10	236.4	2023-06-19	73	2	1	23.64	Satış
518	10	232.89999999999998	2023-06-19	73	2	1	23.29	Satış
521	10000	252800	2023-06-19	73	5	1	25.28	Alış
527	10	234.8	2023-06-19	73	2	1	23.48	Satış
533	1	23.83	2023-06-19	73	2	1	23.83	Alış
538	100	81.72571027709576	2023-06-20	73	2	4	23.30	Satış
542	100	0	2023-06-21	73	3	3	25.97	Satış
544	10	232.89999999999998	2023-06-22	73	2	1	23.29	Satış
548	189	4836.51	2023-06-29	73	5	1	25.59	Alış
552	1000	24000	2023-07-02	73	2	1	24.00	Satış
556	12	13.284608770421324	2023-07-10	73	3	2	25.75	Satış
464	100	2317	2023-06-17	73	2	1	23.17	Satış
470	100	2367	2023-06-17	73	2	1	23.67	Satış
474	100	2352	2023-06-17	73	2	1	23.52	Alım
479	10000	256000	2023-06-17	73	3	1	25.60	Alım
483	10000	232000	2023-06-17	73	2	1	23.20	Satış
487	10000	234400	2023-06-17	73	2	1	23.44	Satış
491	90000	2141100	2023-06-17	73	2	1	23.79	Satış
496	100	2568	2023-06-17	73	3	1	25.68	Satış
500	10	252.8	2023-06-18	73	3	1	25.28	Buy
505	239580	6126060.6	2023-06-18	73	3	1	25.57	Alış
509	1000	25360	2023-06-18	92	3	1	25.36	Satış
513	10	236.4	2023-06-19	73	2	1	23.64	Satış
519	100000	2349000	2023-06-19	73	2	1	23.49	Alış
522	10	234.4	2023-06-19	73	2	1	23.44	Satış
528	10	9.290012033694344	2023-06-19	73	2	5	23.16	Satış
539	1000	805.4595715272978	2023-06-20	73	2	4	23.31	Satış
545	10	237.89999999999998	2023-06-22	73	2	1	23.79	Buy
549	0.27	6.9876000000000005	2023-06-29	73	5	1	25.88	Alış
553	1000	23950	2023-07-02	73	2	1	23.95	Alış
557	54	61.055749128919864	2023-07-10	73	3	2	25.96	Satış
466	20	0	2023-06-17	73	2	0	23.82	Satış
471	100	2380	2023-06-17	73	2	1	23.80	Satış
475	100	2313	2023-06-17	73	2	1	23.13	Alım
480	10000	233800	2023-06-17	73	2	1	23.38	Alım
484	10000	236500	2023-06-17	73	2	1	23.65	Satış
488	10000	234400	2023-06-17	73	2	1	23.44	Satış
492	10000	254000	2023-06-17	73	3	1	25.40	Alım
497	10	251.9	2023-06-18	73	3	1	25.19	Sell
502	119790	3042666	2023-06-18	73	3	1	25.40	Alış
506	718740	18378181.8	2023-06-18	73	3	1	25.57	Satış
510	9000	215730	2023-06-18	92	2	1	23.97	Satış
514	100	2355	2023-06-19	73	2	1	23.55	Satış
523	230	5494.7	2023-06-19	73	2	1	23.89	Sell
530	10	9.606331168831169	2023-06-19	73	2	5	23.67	Satış
540	1000	23460	2023-06-20	73	2	1	23.46	Satış
546	10000	252500	2023-06-23	73	5	1	25.25	Satış
550	150	3759	2023-07-01	73	5	1	25.06	Satış
554	1222	1168.6527947776417	2023-07-02	73	2	5	23.44	Satış
\.


--
-- Data for Name: sube; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sube (subeid, subeadi, subekodu) FROM stdin;
1	1257 SERDİVAN/SAK	\N
2	1258 ADAPAZARI/SAK	\N
3	1245 ARGINCIK/KAY	\N
4	1246 KOCASİNAN/KAY	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, fullname, telno, tcno, password, email, dogumtarih) FROM stdin;
92	Yusuf Eren DÜNDAR 	05394789712	12324565789	12324565	Yusuf@gmail.com	12-12-2000
93	Bahadir Kocak	05539999878	12345678912	179317	bahadirgmail.com	02-02-2013
94	haldir	123123123	11111111111	123243	haldir@gmail.com	12-12-2000
73	Kürşad Eren MADEN	05539777143	27337851310	2512252	k.erenmaden1@outlook.com	2001-12-07
95	Yusuf Dündar	055397778545	11111111112	111111	yusufdundar@gmail.com	12-12-2000
\.


--
-- Data for Name: usershesap; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usershesap (usershesapid, usersid, hesapturid, hesapno, subeid, doviztipiid, iban, hesapbakiye) FROM stdin;
66	92	6	1005300	1	1	TR12325278855080195707	10000
71	95	6	1005800	1	1	TR12325954407427648246	10000
64	73	6	1005100	2	1	TR12329773426399276694	257907.5023999999999995
70	73	6	1005700	1	2	TR12323621650808428476	8852.340357899341188
68	73	6	1005500	3	3	TR12328016934078325634	10982
65	73	6	1005200	4	2	TR12323763327721149772	10278.6605584067702
\.


--
-- Name: Users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_userid_seq"', 95, true);


--
-- Name: doviz_doviztipiid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doviz_doviztipiid_seq', 5, true);


--
-- Name: hesaptur_hesapturid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hesaptur_hesapturid_seq', 6, true);


--
-- Name: işlem_islemid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."işlem_islemid_seq"', 557, true);


--
-- Name: sube_subeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sube_subeid_seq', 4, true);


--
-- Name: usershesap_hesapno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usershesap_hesapno_seq', 1005899, true);


--
-- Name: usershesap_userhesapid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usershesap_userhesapid_seq', 71, true);


--
-- Name: doviz doviz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doviz
    ADD CONSTRAINT doviz_pkey PRIMARY KEY (doviztipiid);


--
-- Name: hesaptur hesaptur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hesaptur
    ADD CONSTRAINT hesaptur_pkey PRIMARY KEY (hesapturid);


--
-- Name: islem işlem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.islem
    ADD CONSTRAINT "işlem_pkey" PRIMARY KEY (islemid);


--
-- Name: sube sube_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sube
    ADD CONSTRAINT sube_pkey PRIMARY KEY (subeid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: usershesap usershesap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usershesap
    ADD CONSTRAINT usershesap_pkey PRIMARY KEY (usershesapid);


--
-- Name: usershesap dovizid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usershesap
    ADD CONSTRAINT dovizid_fk FOREIGN KEY (doviztipiid) REFERENCES public.doviz(doviztipiid) NOT VALID;


--
-- Name: usershesap hesapturid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usershesap
    ADD CONSTRAINT hesapturid_fk FOREIGN KEY (hesapturid) REFERENCES public.hesaptur(hesapturid) NOT VALID;


--
-- Name: islem islem_usersid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.islem
    ADD CONSTRAINT islem_usersid_fkey FOREIGN KEY (usersid) REFERENCES public.users(userid) NOT VALID;


--
-- Name: usershesap subeid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usershesap
    ADD CONSTRAINT subeid_fk FOREIGN KEY (subeid) REFERENCES public.sube(subeid) NOT VALID;


--
-- Name: usershesap usersid_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usershesap
    ADD CONSTRAINT usersid_fk FOREIGN KEY (usersid) REFERENCES public.users(userid) NOT VALID;


--
-- PostgreSQL database dump complete
--

