-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.atelier
(
    id_atelier uuid NOT NULL DEFAULT uuid_generate_v4(),
    nom_atelier text COLLATE pg_catalog."default" NOT NULL,
    id_departement uuid NOT NULL,
    CONSTRAINT atelier_pkey PRIMARY KEY (id_atelier)
);

CREATE TABLE IF NOT EXISTS public.client
(
    id_client uuid NOT NULL DEFAULT uuid_generate_v4(),
    nom_client text COLLATE pg_catalog."default" NOT NULL,
    adresse_client text COLLATE pg_catalog."default" NOT NULL,
    tel_client text COLLATE pg_catalog."default" NOT NULL,
    email_client text COLLATE pg_catalog."default",
    CONSTRAINT client_pkey PRIMARY KEY (id_client)
);

CREATE TABLE IF NOT EXISTS public.departement
(
    id_departement uuid NOT NULL DEFAULT uuid_generate_v4(),
    nom_departement text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT departement_pkey PRIMARY KEY (id_departement)
);

CREATE TABLE IF NOT EXISTS public.dossier
(
    id_dossier uuid NOT NULL DEFAULT uuid_generate_v4(),
    date_creation timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_departement uuid NOT NULL,
    id_client uuid NOT NULL,
    CONSTRAINT dossier_pkey PRIMARY KEY (id_dossier)
);

CREATE TABLE IF NOT EXISTS public.employe
(
    id_employe uuid NOT NULL DEFAULT uuid_generate_v4(),
    nom_employe text COLLATE pg_catalog."default" NOT NULL,
    prenom_employe text COLLATE pg_catalog."default" NOT NULL,
    date_nais date NOT NULL,
    tel_employe text COLLATE pg_catalog."default" NOT NULL,
    id_atelier uuid NOT NULL,
    CONSTRAINT employe_pkey PRIMARY KEY (id_employe)
);

CREATE TABLE IF NOT EXISTS public.matiere_premiere
(
    id_matiere uuid NOT NULL DEFAULT uuid_generate_v4(),
    designation_matiere text COLLATE pg_catalog."default" NOT NULL,
    description_matiere text COLLATE pg_catalog."default",
    CONSTRAINT matiere_premiere_pkey PRIMARY KEY (id_matiere)
);

CREATE TABLE IF NOT EXISTS public.produit
(
    id_produit uuid NOT NULL DEFAULT uuid_generate_v4(),
    designation_produit text COLLATE pg_catalog."default" NOT NULL,
    description_produit text COLLATE pg_catalog."default",
    id_type_produit uuid NOT NULL,
    CONSTRAINT produit_pkey PRIMARY KEY (id_produit)
);

CREATE TABLE IF NOT EXISTS public.produit_aproduire
(
    id_dossier uuid NOT NULL,
    id_produit uuid NOT NULL,
    quantite integer NOT NULL,
    CONSTRAINT produit_aproduire_pkey PRIMARY KEY (id_dossier, id_produit)
);

CREATE TABLE IF NOT EXISTS public.type_produit
(
    id_type_produit uuid NOT NULL DEFAULT uuid_generate_v4(),
    designation_type_produit text COLLATE pg_catalog."default",
    CONSTRAINT type_produit_pkey PRIMARY KEY (id_type_produit)
);

ALTER TABLE IF EXISTS public.atelier
    ADD CONSTRAINT atelier_id_departement_fkey FOREIGN KEY (id_departement)
    REFERENCES public.departement (id_departement) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.dossier
    ADD CONSTRAINT dossier_id_client_fkey FOREIGN KEY (id_client)
    REFERENCES public.client (id_client) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.dossier
    ADD CONSTRAINT dossier_id_departement_fkey FOREIGN KEY (id_departement)
    REFERENCES public.departement (id_departement) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.employe
    ADD CONSTRAINT employe_id_atelier_fkey FOREIGN KEY (id_atelier)
    REFERENCES public.atelier (id_atelier) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.produit
    ADD CONSTRAINT produit_id_type_produit_fkey FOREIGN KEY (id_type_produit)
    REFERENCES public.type_produit (id_type_produit) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.produit_aproduire
    ADD CONSTRAINT produit_aproduire_id_dossier_fkey FOREIGN KEY (id_dossier)
    REFERENCES public.dossier (id_dossier) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.produit_aproduire
    ADD CONSTRAINT produit_aproduire_id_produit_fkey FOREIGN KEY (id_produit)
    REFERENCES public.produit (id_produit) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;