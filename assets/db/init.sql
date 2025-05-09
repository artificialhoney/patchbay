--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8 (Debian 13.8-1.pgdg110+1)
-- Dumped by pg_dump version 13.8 (Debian 13.8-1.pgdg110+1)

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
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA tiger;


ALTER SCHEMA tiger OWNER TO admin;

--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA tiger_data;


ALTER SCHEMA tiger_data OWNER TO admin;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO admin;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: directus_access; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_access (
    id uuid NOT NULL,
    role uuid,
    "user" uuid,
    policy uuid NOT NULL,
    sort integer
);


ALTER TABLE public.directus_access OWNER TO admin;

--
-- Name: directus_activity; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_activity (
    id integer NOT NULL,
    action character varying(45) NOT NULL,
    "user" uuid,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip character varying(50),
    user_agent text,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    origin character varying(255)
);


ALTER TABLE public.directus_activity OWNER TO admin;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_activity_id_seq OWNER TO admin;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;


--
-- Name: directus_collections; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_collections (
    collection character varying(64) NOT NULL,
    icon character varying(64),
    note text,
    display_template character varying(255),
    hidden boolean DEFAULT false NOT NULL,
    singleton boolean DEFAULT false NOT NULL,
    translations json,
    archive_field character varying(64),
    archive_app_filter boolean DEFAULT true NOT NULL,
    archive_value character varying(255),
    unarchive_value character varying(255),
    sort_field character varying(64),
    accountability character varying(255) DEFAULT 'all'::character varying,
    color character varying(255),
    item_duplication_fields json,
    sort integer,
    "group" character varying(64),
    collapse character varying(255) DEFAULT 'open'::character varying NOT NULL,
    preview_url character varying(255),
    versioning boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_collections OWNER TO admin;

--
-- Name: directus_comments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_comments (
    id uuid NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    comment text NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid
);


ALTER TABLE public.directus_comments OWNER TO admin;

--
-- Name: directus_dashboards; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);


ALTER TABLE public.directus_dashboards OWNER TO admin;

--
-- Name: directus_extensions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_extensions (
    enabled boolean DEFAULT true NOT NULL,
    id uuid NOT NULL,
    folder character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    bundle uuid
);


ALTER TABLE public.directus_extensions OWNER TO admin;

--
-- Name: directus_fields; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_fields (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    field character varying(64) NOT NULL,
    special character varying(64),
    interface character varying(64),
    options json,
    display character varying(64),
    display_options json,
    readonly boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    sort integer,
    width character varying(30) DEFAULT 'full'::character varying,
    translations json,
    note text,
    conditions json,
    required boolean DEFAULT false,
    "group" character varying(64),
    validation json,
    validation_message text
);


ALTER TABLE public.directus_fields OWNER TO admin;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_fields_id_seq OWNER TO admin;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;


--
-- Name: directus_files; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_files (
    id uuid NOT NULL,
    storage character varying(255) NOT NULL,
    filename_disk character varying(255),
    filename_download character varying(255) NOT NULL,
    title character varying(255),
    type character varying(255),
    folder uuid,
    uploaded_by uuid,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by uuid,
    modified_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    charset character varying(50),
    filesize bigint,
    width integer,
    height integer,
    duration integer,
    embed character varying(200),
    description text,
    location text,
    tags text,
    metadata json,
    focal_point_x integer,
    focal_point_y integer,
    tus_id character varying(64),
    tus_data json,
    uploaded_on timestamp with time zone
);


ALTER TABLE public.directus_files OWNER TO admin;

--
-- Name: directus_flows; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_flows (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64),
    color character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    trigger character varying(255),
    accountability character varying(255) DEFAULT 'all'::character varying,
    options json,
    operation uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_flows OWNER TO admin;

--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);


ALTER TABLE public.directus_folders OWNER TO admin;

--
-- Name: directus_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.directus_migrations OWNER TO admin;

--
-- Name: directus_notifications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_notifications (
    id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'inbox'::character varying,
    recipient uuid NOT NULL,
    sender uuid,
    subject character varying(255) NOT NULL,
    message text,
    collection character varying(64),
    item character varying(255)
);


ALTER TABLE public.directus_notifications OWNER TO admin;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_notifications_id_seq OWNER TO admin;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;


--
-- Name: directus_operations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_operations (
    id uuid NOT NULL,
    name character varying(255),
    key character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    options json,
    resolve uuid,
    reject uuid,
    flow uuid NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_operations OWNER TO admin;

--
-- Name: directus_panels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_panels (
    id uuid NOT NULL,
    dashboard uuid NOT NULL,
    name character varying(255),
    icon character varying(64) DEFAULT NULL::character varying,
    color character varying(10),
    show_header boolean DEFAULT false NOT NULL,
    note text,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    options json,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_panels OWNER TO admin;

--
-- Name: directus_permissions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_permissions (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    action character varying(10) NOT NULL,
    permissions json,
    validation json,
    presets json,
    fields text,
    policy uuid NOT NULL
);


ALTER TABLE public.directus_permissions OWNER TO admin;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_permissions_id_seq OWNER TO admin;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;


--
-- Name: directus_policies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_policies (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'badge'::character varying NOT NULL,
    description text,
    ip_access text,
    enforce_tfa boolean DEFAULT false NOT NULL,
    admin_access boolean DEFAULT false NOT NULL,
    app_access boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_policies OWNER TO admin;

--
-- Name: directus_presets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_presets (
    id integer NOT NULL,
    bookmark character varying(255),
    "user" uuid,
    role uuid,
    collection character varying(64),
    search character varying(100),
    layout character varying(100) DEFAULT 'tabular'::character varying,
    layout_query json,
    layout_options json,
    refresh_interval integer,
    filter json,
    icon character varying(64) DEFAULT 'bookmark'::character varying,
    color character varying(255)
);


ALTER TABLE public.directus_presets OWNER TO admin;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_presets_id_seq OWNER TO admin;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;


--
-- Name: directus_relations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_relations (
    id integer NOT NULL,
    many_collection character varying(64) NOT NULL,
    many_field character varying(64) NOT NULL,
    one_collection character varying(64),
    one_field character varying(64),
    one_collection_field character varying(64),
    one_allowed_collections text,
    junction_field character varying(64),
    sort_field character varying(64),
    one_deselect_action character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);


ALTER TABLE public.directus_relations OWNER TO admin;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_relations_id_seq OWNER TO admin;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;


--
-- Name: directus_revisions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_revisions (
    id integer NOT NULL,
    activity integer NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    data json,
    delta json,
    parent integer,
    version uuid
);


ALTER TABLE public.directus_revisions OWNER TO admin;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_revisions_id_seq OWNER TO admin;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;


--
-- Name: directus_roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    parent uuid
);


ALTER TABLE public.directus_roles OWNER TO admin;

--
-- Name: directus_sessions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_sessions (
    token character varying(64) NOT NULL,
    "user" uuid,
    expires timestamp with time zone NOT NULL,
    ip character varying(255),
    user_agent text,
    share uuid,
    origin character varying(255),
    next_token character varying(64)
);


ALTER TABLE public.directus_sessions OWNER TO admin;

--
-- Name: directus_settings; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_settings (
    id integer NOT NULL,
    project_name character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    project_url character varying(255),
    project_color character varying(255) DEFAULT '#6644FF'::character varying NOT NULL,
    project_logo uuid,
    public_foreground uuid,
    public_background uuid,
    public_note text,
    auth_login_attempts integer DEFAULT 25,
    auth_password_policy character varying(100),
    storage_asset_transform character varying(7) DEFAULT 'all'::character varying,
    storage_asset_presets json,
    custom_css text,
    storage_default_folder uuid,
    basemaps json,
    mapbox_key character varying(255),
    module_bar json,
    project_descriptor character varying(100),
    default_language character varying(255) DEFAULT 'en-US'::character varying NOT NULL,
    custom_aspect_ratios json,
    public_favicon uuid,
    default_appearance character varying(255) DEFAULT 'auto'::character varying NOT NULL,
    default_theme_light character varying(255),
    theme_light_overrides json,
    default_theme_dark character varying(255),
    theme_dark_overrides json,
    report_error_url character varying(255),
    report_bug_url character varying(255),
    report_feature_url character varying(255),
    public_registration boolean DEFAULT false NOT NULL,
    public_registration_verify_email boolean DEFAULT true NOT NULL,
    public_registration_role uuid,
    public_registration_email_filter json,
    visual_editor_urls json
);


ALTER TABLE public.directus_settings OWNER TO admin;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_settings_id_seq OWNER TO admin;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;


--
-- Name: directus_shares; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_shares (
    id uuid NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    role uuid,
    password character varying(255),
    user_created uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_start timestamp with time zone,
    date_end timestamp with time zone,
    times_used integer DEFAULT 0,
    max_uses integer
);


ALTER TABLE public.directus_shares OWNER TO admin;

--
-- Name: directus_translations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.directus_translations OWNER TO admin;

--
-- Name: directus_users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_users (
    id uuid NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(128),
    password character varying(255),
    location character varying(255),
    title character varying(50),
    description text,
    tags json,
    avatar uuid,
    language character varying(255) DEFAULT NULL::character varying,
    tfa_secret character varying(255),
    status character varying(16) DEFAULT 'active'::character varying NOT NULL,
    role uuid,
    token character varying(255),
    last_access timestamp with time zone,
    last_page character varying(255),
    provider character varying(128) DEFAULT 'default'::character varying NOT NULL,
    external_identifier character varying(255),
    auth_data json,
    email_notifications boolean DEFAULT true,
    appearance character varying(255),
    theme_dark character varying(255),
    theme_light character varying(255),
    theme_light_overrides json,
    theme_dark_overrides json
);


ALTER TABLE public.directus_users OWNER TO admin;

--
-- Name: directus_versions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_versions (
    id uuid NOT NULL,
    key character varying(64) NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    hash character varying(255),
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid,
    delta json
);


ALTER TABLE public.directus_versions OWNER TO admin;

--
-- Name: directus_webhooks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.directus_webhooks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    method character varying(10) DEFAULT 'POST'::character varying NOT NULL,
    url character varying(255) NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying NOT NULL,
    data boolean DEFAULT true NOT NULL,
    actions character varying(100) NOT NULL,
    collections character varying(255) NOT NULL,
    headers json,
    was_active_before_deprecation boolean DEFAULT false NOT NULL,
    migrated_flow uuid
);


ALTER TABLE public.directus_webhooks OWNER TO admin;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.directus_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_webhooks_id_seq OWNER TO admin;

--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.directus_webhooks_id_seq OWNED BY public.directus_webhooks.id;


--
-- Name: patches; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.patches (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'draft'::character varying NOT NULL,
    user_created uuid,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    title character varying(255),
    definition json
);


ALTER TABLE public.patches OWNER TO admin;

--
-- Name: patches_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.patches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patches_id_seq OWNER TO admin;

--
-- Name: patches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.patches_id_seq OWNED BY public.patches.id;


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);


--
-- Name: directus_notifications id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);


--
-- Name: directus_permissions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);


--
-- Name: directus_presets id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);


--
-- Name: directus_relations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);


--
-- Name: directus_revisions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);


--
-- Name: directus_settings id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);


--
-- Name: directus_webhooks id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_webhooks ALTER COLUMN id SET DEFAULT nextval('public.directus_webhooks_id_seq'::regclass);


--
-- Name: patches id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patches ALTER COLUMN id SET DEFAULT nextval('public.patches_id_seq'::regclass);


--
-- Data for Name: directus_access; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_access (id, role, "user", policy, sort) FROM stdin;
ca722cb8-a6d2-4e38-98f2-da7777c0b51e	\N	\N	abf8a154-5b1c-4a46-ac9c-7300570f4f17	1
4b872590-ae55-43b1-8542-98c8efc357d8	4b92eda1-d0dd-4c1c-9d61-bd4c6c0760d5	\N	d1de0206-e311-4abf-bf55-0251749c8336	\N
\.


--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, origin) FROM stdin;
1	login	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 10:22:50.289+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_users	c98c06cc-00a7-4916-b81f-e6d192d57165	http://localhost:8080
2	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 10:23:20.649+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:8080
3	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.686+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	1	http://localhost:8080
4	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.695+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	2	http://localhost:8080
5	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.699+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	3	http://localhost:8080
6	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.702+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	4	http://localhost:8080
7	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.705+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	5	http://localhost:8080
8	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:20:28.71+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_collections	patches	http://localhost:8080
9	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:22:17.677+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	6	http://localhost:8080
10	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:24:31.693+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_fields	7	http://localhost:8080
11	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:26:17.126+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_collections	patches	http://localhost:8080
12	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:27:40.496+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_folders	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c	http://localhost:8080
13	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:28:36.432+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_folders	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c	http://localhost:8080
14	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 19:28:49.116+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_folders	d888e909-1307-4dd4-a8b9-307310bddd4e	http://localhost:8080
15	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:00:02.261+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:8080
16	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:04:35.489+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_folders	59a4908b-d34d-4e0a-80e4-77a979bbab42	http://localhost:8080
17	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:05:14.548+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	79751a2d-4e83-4c3f-a864-72fe388dd2c9	http://localhost:8080
18	delete	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:05:14.559+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	79751a2d-4e83-4c3f-a864-72fe388dd2c9	http://localhost:8080
19	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:05:54.401+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	ef507159-ff86-4c47-8df3-482b7d1c84d7	http://localhost:8080
20	delete	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:05:54.407+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	ef507159-ff86-4c47-8df3-482b7d1c84d7	http://localhost:8080
21	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:09:40.421+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	9b53dc0d-fb02-4c85-87c8-791de0c38511	http://localhost:8080
22	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:10:09.226+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	79179a80-2583-42e4-8f73-ebbbc5752b98	http://localhost:8080
24	create	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:13:00.318+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	5f0f0d68-d296-4e5c-aef5-51ab39136181	http://localhost:8080
25	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:13:04.959+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:8080
26	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:13:22.352+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:8080
27	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:13:48.383+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:8080
28	delete	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:14:32.861+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	9b53dc0d-fb02-4c85-87c8-791de0c38511	http://localhost:8080
29	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:14:44.07+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	5f0f0d68-d296-4e5c-aef5-51ab39136181	http://localhost:8080
30	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:14:44.072+00	172.18.0.5	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_files	79179a80-2583-42e4-8f73-ebbbc5752b98	http://localhost:8080
31	login	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-09 22:28:47.994+00	127.0.0.1	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_users	c98c06cc-00a7-4916-b81f-e6d192d57165	http://localhost:3000
32	update	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-09 22:30:11.478+00	127.0.0.1	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	directus_settings	1	http://localhost:3000
\.


--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url, versioning) FROM stdin;
patches	cable	\N	\N	f	f	\N	status	t	archived	draft	\N	all	\N	\N	\N	\N	open	\N	f
\.


--
-- Data for Name: directus_comments; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_comments (id, collection, item, comment, date_created, date_updated, user_created, user_updated) FROM stdin;
\.


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
\.


--
-- Data for Name: directus_extensions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_extensions (enabled, id, folder, source, bundle) FROM stdin;
t	4145d53f-8bc7-4481-a4a0-89dde5cc9d1e	patchbay	local	\N
t	b510d138-eacb-40c6-9f13-0fc5c8c3a1c4	endpoints	local	4145d53f-8bc7-4481-a4a0-89dde5cc9d1e
t	dfdf31b3-6ef1-4aa9-8977-3bf4913016a6	hooks	local	4145d53f-8bc7-4481-a4a0-89dde5cc9d1e
t	efd7de5c-4505-49cf-9015-fb12497c330e	theme	local	4145d53f-8bc7-4481-a4a0-89dde5cc9d1e
\.


--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message) FROM stdin;
1	patches	id	\N	input	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N
2	patches	status	\N	select-dropdown	{"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)"}]}	labels	{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)","foreground":"var(--theme--primary)","background":"var(--theme--primary-background)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)","foreground":"var(--theme--foreground)","background":"var(--theme--background-normal)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)","foreground":"var(--theme--warning)","background":"var(--theme--warning-background)"}]}	f	f	2	full	\N	\N	\N	f	\N	\N	\N
3	patches	user_created	user-created	select-dropdown-m2o	{"template":"{{avatar}} {{first_name}} {{last_name}}"}	user	\N	t	t	3	half	\N	\N	\N	f	\N	\N	\N
4	patches	date_created	date-created	datetime	\N	datetime	{"relative":true}	t	t	4	half	\N	\N	\N	f	\N	\N	\N
5	patches	date_updated	date-updated	datetime	\N	datetime	{"relative":true}	t	t	5	half	\N	\N	\N	f	\N	\N	\N
6	patches	title	\N	input	\N	\N	\N	f	f	6	full	\N	\N	\N	t	\N	\N	\N
7	patches	definition	cast-json	input-code	{"lineWrapping":true}	\N	\N	f	f	7	full	\N	\N	\N	t	\N	\N	\N
\.


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, created_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata, focal_point_x, focal_point_y, tus_id, tus_data, uploaded_on) FROM stdin;
79179a80-2583-42e4-8f73-ebbbc5752b98	local	79179a80-2583-42e4-8f73-ebbbc5752b98.svg	project-logo.svg	Project Logo	image/svg+xml	59a4908b-d34d-4e0a-80e4-77a979bbab42	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:10:09.226+00	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:14:44.068+00	\N	943	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-05-05 20:10:09.231+00
5f0f0d68-d296-4e5c-aef5-51ab39136181	local	5f0f0d68-d296-4e5c-aef5-51ab39136181.svg	public-favicon.svg	Public Favicon	image/svg+xml	59a4908b-d34d-4e0a-80e4-77a979bbab42	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:13:00.317+00	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-05 20:14:44.068+00	\N	946	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-05-05 20:13:00.322+00
\.


--
-- Data for Name: directus_flows; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_folders (id, name, parent) FROM stdin;
1cdbdd65-b1a5-468d-8cfc-3c733b10c57c	assets	\N
d888e909-1307-4dd4-a8b9-307310bddd4e	patches	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c
59a4908b-d34d-4e0a-80e4-77a979bbab42	app	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c
\.


--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
20201028A	Remove Collection Foreign Keys	2025-05-05 10:22:17.9524+00
20201029A	Remove System Relations	2025-05-05 10:22:17.958409+00
20201029B	Remove System Collections	2025-05-05 10:22:17.964969+00
20201029C	Remove System Fields	2025-05-05 10:22:17.973836+00
20201105A	Add Cascade System Relations	2025-05-05 10:22:18.010772+00
20201105B	Change Webhook URL Type	2025-05-05 10:22:18.018433+00
20210225A	Add Relations Sort Field	2025-05-05 10:22:18.024926+00
20210304A	Remove Locked Fields	2025-05-05 10:22:18.029759+00
20210312A	Webhooks Collections Text	2025-05-05 10:22:18.0371+00
20210331A	Add Refresh Interval	2025-05-05 10:22:18.040232+00
20210415A	Make Filesize Nullable	2025-05-05 10:22:18.047021+00
20210416A	Add Collections Accountability	2025-05-05 10:22:18.051463+00
20210422A	Remove Files Interface	2025-05-05 10:22:18.053869+00
20210506A	Rename Interfaces	2025-05-05 10:22:18.074773+00
20210510A	Restructure Relations	2025-05-05 10:22:18.087131+00
20210518A	Add Foreign Key Constraints	2025-05-05 10:22:18.095477+00
20210519A	Add System Fk Triggers	2025-05-05 10:22:18.117796+00
20210521A	Add Collections Icon Color	2025-05-05 10:22:18.120885+00
20210525A	Add Insights	2025-05-05 10:22:18.137189+00
20210608A	Add Deep Clone Config	2025-05-05 10:22:18.140658+00
20210626A	Change Filesize Bigint	2025-05-05 10:22:18.15194+00
20210716A	Add Conditions to Fields	2025-05-05 10:22:18.154983+00
20210721A	Add Default Folder	2025-05-05 10:22:18.161045+00
20210802A	Replace Groups	2025-05-05 10:22:18.168401+00
20210803A	Add Required to Fields	2025-05-05 10:22:18.171431+00
20210805A	Update Groups	2025-05-05 10:22:18.175916+00
20210805B	Change Image Metadata Structure	2025-05-05 10:22:18.180331+00
20210811A	Add Geometry Config	2025-05-05 10:22:18.183551+00
20210831A	Remove Limit Column	2025-05-05 10:22:18.186293+00
20210903A	Add Auth Provider	2025-05-05 10:22:18.201053+00
20210907A	Webhooks Collections Not Null	2025-05-05 10:22:18.208109+00
20210910A	Move Module Setup	2025-05-05 10:22:18.212541+00
20210920A	Webhooks URL Not Null	2025-05-05 10:22:18.219554+00
20210924A	Add Collection Organization	2025-05-05 10:22:18.227565+00
20210927A	Replace Fields Group	2025-05-05 10:22:18.237103+00
20210927B	Replace M2M Interface	2025-05-05 10:22:18.239855+00
20210929A	Rename Login Action	2025-05-05 10:22:18.242583+00
20211007A	Update Presets	2025-05-05 10:22:18.248466+00
20211009A	Add Auth Data	2025-05-05 10:22:18.251499+00
20211016A	Add Webhook Headers	2025-05-05 10:22:18.25486+00
20211103A	Set Unique to User Token	2025-05-05 10:22:18.259727+00
20211103B	Update Special Geometry	2025-05-05 10:22:18.262737+00
20211104A	Remove Collections Listing	2025-05-05 10:22:18.266422+00
20211118A	Add Notifications	2025-05-05 10:22:18.279677+00
20211211A	Add Shares	2025-05-05 10:22:18.29628+00
20211230A	Add Project Descriptor	2025-05-05 10:22:18.300169+00
20220303A	Remove Default Project Color	2025-05-05 10:22:18.307163+00
20220308A	Add Bookmark Icon and Color	2025-05-05 10:22:18.310169+00
20220314A	Add Translation Strings	2025-05-05 10:22:18.313128+00
20220322A	Rename Field Typecast Flags	2025-05-05 10:22:18.317809+00
20220323A	Add Field Validation	2025-05-05 10:22:18.321404+00
20220325A	Fix Typecast Flags	2025-05-05 10:22:18.325613+00
20220325B	Add Default Language	2025-05-05 10:22:18.334776+00
20220402A	Remove Default Value Panel Icon	2025-05-05 10:22:18.341888+00
20220429A	Add Flows	2025-05-05 10:22:18.36988+00
20220429B	Add Color to Insights Icon	2025-05-05 10:22:18.373065+00
20220429C	Drop Non Null From IP of Activity	2025-05-05 10:22:18.375879+00
20220429D	Drop Non Null From Sender of Notifications	2025-05-05 10:22:18.378737+00
20220614A	Rename Hook Trigger to Event	2025-05-05 10:22:18.381101+00
20220801A	Update Notifications Timestamp Column	2025-05-05 10:22:18.387573+00
20220802A	Add Custom Aspect Ratios	2025-05-05 10:22:18.391025+00
20220826A	Add Origin to Accountability	2025-05-05 10:22:18.395335+00
20230401A	Update Material Icons	2025-05-05 10:22:18.404407+00
20230525A	Add Preview Settings	2025-05-05 10:22:18.408324+00
20230526A	Migrate Translation Strings	2025-05-05 10:22:18.419929+00
20230721A	Require Shares Fields	2025-05-05 10:22:18.425274+00
20230823A	Add Content Versioning	2025-05-05 10:22:18.442191+00
20230927A	Themes	2025-05-05 10:22:18.456047+00
20231009A	Update CSV Fields to Text	2025-05-05 10:22:18.460322+00
20231009B	Update Panel Options	2025-05-05 10:22:18.463046+00
20231010A	Add Extensions	2025-05-05 10:22:18.468075+00
20231215A	Add Focalpoints	2025-05-05 10:22:18.471279+00
20240122A	Add Report URL Fields	2025-05-05 10:22:18.474663+00
20240204A	Marketplace	2025-05-05 10:22:18.49767+00
20240305A	Change Useragent Type	2025-05-05 10:22:18.505971+00
20240311A	Deprecate Webhooks	2025-05-05 10:22:18.513603+00
20240422A	Public Registration	2025-05-05 10:22:18.518678+00
20240515A	Add Session Window	2025-05-05 10:22:18.522198+00
20240701A	Add Tus Data	2025-05-05 10:22:18.526252+00
20240716A	Update Files Date Fields	2025-05-05 10:22:18.533433+00
20240806A	Permissions Policies	2025-05-05 10:22:18.568652+00
20240817A	Update Icon Fields Length	2025-05-05 10:22:18.594488+00
20240909A	Separate Comments	2025-05-05 10:22:18.606675+00
20240909B	Consolidate Content Versioning	2025-05-05 10:22:18.609507+00
20240924A	Migrate Legacy Comments	2025-05-05 10:22:18.614222+00
20240924B	Populate Versioning Deltas	2025-05-05 10:22:18.61928+00
20250224A	Visual Editor	2025-05-05 10:22:18.622872+00
\.


--
-- Data for Name: directus_notifications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
\.


--
-- Data for Name: directus_operations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_permissions (id, collection, action, permissions, validation, presets, fields, policy) FROM stdin;
\.


--
-- Data for Name: directus_policies; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_policies (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
abf8a154-5b1c-4a46-ac9c-7300570f4f17	$t:public_label	public	$t:public_description	\N	f	f	f
d1de0206-e311-4abf-bf55-0251749c8336	Administrator	verified	$t:admin_description	\N	f	t	t
\.


--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
1	\N	c98c06cc-00a7-4916-b81f-e6d192d57165	\N	directus_users	\N	cards	{"cards":{"sort":["email"],"page":1}}	{"cards":{"icon":"account_circle","title":"{{ first_name }} {{ last_name }}","subtitle":"{{ email }}","size":4}}	\N	\N	bookmark	\N
2	\N	c98c06cc-00a7-4916-b81f-e6d192d57165	\N	directus_files	\N	cards	{"cards":{"sort":["-uploaded_on"],"page":1}}	{"cards":{"icon":"insert_drive_file","title":"{{ title }}","subtitle":"{{ type }} • {{ filesize }}","size":4,"imageFit":"crop"}}	\N	\N	bookmark	\N
\.


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
1	patches	user_created	directus_users	\N	\N	\N	\N	\N	nullify
\.


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_revisions (id, activity, collection, item, data, delta, parent, version) FROM stdin;
1	2	directus_settings	1	{"default_theme_dark":"@patchbay/theme"}	{"default_theme_dark":"@patchbay/theme"}	\N	\N
2	3	directus_fields	1	{"sort":1,"hidden":true,"interface":"input","readonly":true,"field":"id","collection":"patches"}	{"sort":1,"hidden":true,"interface":"input","readonly":true,"field":"id","collection":"patches"}	\N	\N
3	4	directus_fields	2	{"sort":2,"width":"full","options":{"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)"}]},"interface":"select-dropdown","display":"labels","display_options":{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)","foreground":"var(--theme--primary)","background":"var(--theme--primary-background)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)","foreground":"var(--theme--foreground)","background":"var(--theme--background-normal)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)","foreground":"var(--theme--warning)","background":"var(--theme--warning-background)"}]},"field":"status","collection":"patches"}	{"sort":2,"width":"full","options":{"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)"}]},"interface":"select-dropdown","display":"labels","display_options":{"showAsDot":true,"choices":[{"text":"$t:published","value":"published","color":"var(--theme--primary)","foreground":"var(--theme--primary)","background":"var(--theme--primary-background)"},{"text":"$t:draft","value":"draft","color":"var(--theme--foreground)","foreground":"var(--theme--foreground)","background":"var(--theme--background-normal)"},{"text":"$t:archived","value":"archived","color":"var(--theme--warning)","foreground":"var(--theme--warning)","background":"var(--theme--warning-background)"}]},"field":"status","collection":"patches"}	\N	\N
4	5	directus_fields	3	{"sort":3,"special":["user-created"],"interface":"select-dropdown-m2o","options":{"template":"{{avatar}} {{first_name}} {{last_name}}"},"display":"user","readonly":true,"hidden":true,"width":"half","field":"user_created","collection":"patches"}	{"sort":3,"special":["user-created"],"interface":"select-dropdown-m2o","options":{"template":"{{avatar}} {{first_name}} {{last_name}}"},"display":"user","readonly":true,"hidden":true,"width":"half","field":"user_created","collection":"patches"}	\N	\N
5	6	directus_fields	4	{"sort":4,"special":["date-created"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true},"field":"date_created","collection":"patches"}	{"sort":4,"special":["date-created"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true},"field":"date_created","collection":"patches"}	\N	\N
6	7	directus_fields	5	{"sort":5,"special":["date-updated"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true},"field":"date_updated","collection":"patches"}	{"sort":5,"special":["date-updated"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true},"field":"date_updated","collection":"patches"}	\N	\N
7	8	directus_collections	patches	{"archive_field":"status","archive_value":"archived","unarchive_value":"draft","singleton":false,"collection":"patches"}	{"archive_field":"status","archive_value":"archived","unarchive_value":"draft","singleton":false,"collection":"patches"}	\N	\N
8	9	directus_fields	6	{"sort":6,"interface":"input","special":null,"required":true,"collection":"patches","field":"title"}	{"sort":6,"interface":"input","special":null,"required":true,"collection":"patches","field":"title"}	\N	\N
9	10	directus_fields	7	{"sort":7,"interface":"input-code","special":["cast-json"],"required":true,"options":{"lineWrapping":true},"collection":"patches","field":"definition"}	{"sort":7,"interface":"input-code","special":["cast-json"],"required":true,"options":{"lineWrapping":true},"collection":"patches","field":"definition"}	\N	\N
10	11	directus_collections	patches	{"collection":"patches","icon":"cable","note":null,"display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":"status","archive_app_filter":true,"archive_value":"archived","unarchive_value":"draft","sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":null,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"icon":"cable"}	\N	\N
11	12	directus_folders	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c	{"name":"assets/patches"}	{"name":"assets/patches"}	\N	\N
12	13	directus_folders	1cdbdd65-b1a5-468d-8cfc-3c733b10c57c	{"id":"1cdbdd65-b1a5-468d-8cfc-3c733b10c57c","name":"assets","parent":null}	{"name":"assets"}	\N	\N
13	14	directus_folders	d888e909-1307-4dd4-a8b9-307310bddd4e	{"name":"patches","parent":"1cdbdd65-b1a5-468d-8cfc-3c733b10c57c"}	{"name":"patches","parent":"1cdbdd65-b1a5-468d-8cfc-3c733b10c57c"}	\N	\N
14	15	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#07F78C","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":"@patchbay/theme","theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null}	{"project_color":"#07F78C"}	\N	\N
15	16	directus_folders	59a4908b-d34d-4e0a-80e4-77a979bbab42	{"name":"app","parent":"1cdbdd65-b1a5-468d-8cfc-3c733b10c57c"}	{"name":"app","parent":"1cdbdd65-b1a5-468d-8cfc-3c733b10c57c"}	\N	\N
16	17	directus_files	79751a2d-4e83-4c3f-a864-72fe388dd2c9	{"title":"Project Logo","filename_download":"project-logo.svg","type":"image/svg+xml","storage":"local"}	{"title":"Project Logo","filename_download":"project-logo.svg","type":"image/svg+xml","storage":"local"}	\N	\N
17	19	directus_files	ef507159-ff86-4c47-8df3-482b7d1c84d7	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	\N	\N
18	21	directus_files	9b53dc0d-fb02-4c85-87c8-791de0c38511	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	\N	\N
19	22	directus_files	79179a80-2583-42e4-8f73-ebbbc5752b98	{"title":"Project Logo","filename_download":"project-logo.svg","type":"image/svg+xml","storage":"local"}	{"title":"Project Logo","filename_download":"project-logo.svg","type":"image/svg+xml","storage":"local"}	\N	\N
21	24	directus_files	5f0f0d68-d296-4e5c-aef5-51ab39136181	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	{"title":"Public Favicon","filename_download":"public-favicon.svg","type":"image/svg+xml","storage":"local"}	\N	\N
23	26	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#07F78C","project_logo":"79179a80-2583-42e4-8f73-ebbbc5752b98","public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":"5f0f0d68-d296-4e5c-aef5-51ab39136181","default_appearance":"dark","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":"@patchbay/theme","theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null}	{"default_appearance":"dark"}	\N	\N
22	25	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#07F78C","project_logo":"79179a80-2583-42e4-8f73-ebbbc5752b98","public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":"5f0f0d68-d296-4e5c-aef5-51ab39136181","default_appearance":"auto","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":"@patchbay/theme","theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null}	{"project_logo":"79179a80-2583-42e4-8f73-ebbbc5752b98","public_favicon":"5f0f0d68-d296-4e5c-aef5-51ab39136181"}	\N	\N
24	27	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#07F78C","project_logo":"79179a80-2583-42e4-8f73-ebbbc5752b98","public_foreground":null,"public_background":null,"public_note":"Fork of the brilliant [cables.gl](https://cables.gl) web application to extend and build a new full-stack platform.","auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":"5f0f0d68-d296-4e5c-aef5-51ab39136181","default_appearance":"dark","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":"@patchbay/theme","theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null}	{"public_note":"Fork of the brilliant [cables.gl](https://cables.gl) web application to extend and build a new full-stack platform."}	\N	\N
25	29	directus_files	5f0f0d68-d296-4e5c-aef5-51ab39136181	{"id":"5f0f0d68-d296-4e5c-aef5-51ab39136181","storage":"local","filename_disk":"5f0f0d68-d296-4e5c-aef5-51ab39136181.svg","filename_download":"public-favicon.svg","title":"Public Favicon","type":"image/svg+xml","folder":"59a4908b-d34d-4e0a-80e4-77a979bbab42","uploaded_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","created_on":"2025-05-05T20:13:00.317Z","modified_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","modified_on":"2025-05-05T20:14:44.068Z","charset":null,"filesize":"946","width":null,"height":null,"duration":null,"embed":null,"description":null,"location":null,"tags":null,"metadata":null,"focal_point_x":null,"focal_point_y":null,"tus_id":null,"tus_data":null,"uploaded_on":"2025-05-05T20:13:00.322Z"}	{"folder":"59a4908b-d34d-4e0a-80e4-77a979bbab42","modified_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","modified_on":"2025-05-05T20:14:44.068Z"}	\N	\N
26	30	directus_files	79179a80-2583-42e4-8f73-ebbbc5752b98	{"id":"79179a80-2583-42e4-8f73-ebbbc5752b98","storage":"local","filename_disk":"79179a80-2583-42e4-8f73-ebbbc5752b98.svg","filename_download":"project-logo.svg","title":"Project Logo","type":"image/svg+xml","folder":"59a4908b-d34d-4e0a-80e4-77a979bbab42","uploaded_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","created_on":"2025-05-05T20:10:09.226Z","modified_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","modified_on":"2025-05-05T20:14:44.068Z","charset":null,"filesize":"943","width":null,"height":null,"duration":null,"embed":null,"description":null,"location":null,"tags":null,"metadata":null,"focal_point_x":null,"focal_point_y":null,"tus_id":null,"tus_data":null,"uploaded_on":"2025-05-05T20:10:09.231Z"}	{"folder":"59a4908b-d34d-4e0a-80e4-77a979bbab42","modified_by":"c98c06cc-00a7-4916-b81f-e6d192d57165","modified_on":"2025-05-05T20:14:44.068Z"}	\N	\N
27	32	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#07F78C","project_logo":"79179a80-2583-42e4-8f73-ebbbc5752b98","public_foreground":null,"public_background":null,"public_note":"Fork of the brilliant [The brilliant [cables.gl](https://cables.gl) app on a state of the art full-stack platform..gl](https://cables.gl) web application to extend and build a new full-stack platform.","auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":"5f0f0d68-d296-4e5c-aef5-51ab39136181","default_appearance":"dark","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":"@patchbay/theme","theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null}	{"public_note":"Fork of the brilliant [The brilliant [cables.gl](https://cables.gl) app on a state of the art full-stack platform..gl](https://cables.gl) web application to extend and build a new full-stack platform."}	\N	\N
\.


--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_roles (id, name, icon, description, parent) FROM stdin;
4b92eda1-d0dd-4c1c-9d61-bd4c6c0760d5	Administrator	verified	$t:admin_description	\N
\.


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin, next_token) FROM stdin;
s7omK8mjaWTEn1Ii8RFj8M1CoZU7xUN7XAIMdVbTgerb1lnz1x6tlWkNHXx59moB	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-09 22:29:35.132+00	127.0.0.1	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	\N	http://localhost:3000	ow7Lnz7XCdnOT4oMsIXjMD1Ew7rG3Pz9Ax1LLz3WAuKenv-KAN85XHCe9uDrNjzf
ow7Lnz7XCdnOT4oMsIXjMD1Ew7rG3Pz9Ax1LLz3WAuKenv-KAN85XHCe9uDrNjzf	c98c06cc-00a7-4916-b81f-e6d192d57165	2025-05-10 22:29:25.131+00	127.0.0.1	Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:138.0) Gecko/20100101 Firefox/138.0	\N	http://localhost:3000	\N
\.


--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios, public_favicon, default_appearance, default_theme_light, theme_light_overrides, default_theme_dark, theme_dark_overrides, report_error_url, report_bug_url, report_feature_url, public_registration, public_registration_verify_email, public_registration_role, public_registration_email_filter, visual_editor_urls) FROM stdin;
1	Directus	\N	#07F78C	79179a80-2583-42e4-8f73-ebbbc5752b98	\N	\N	Fork of the brilliant [The brilliant [cables.gl](https://cables.gl) app on a state of the art full-stack platform..gl](https://cables.gl) web application to extend and build a new full-stack platform.	25	\N	all	\N	\N	\N	\N	\N	\N	\N	en-US	\N	5f0f0d68-d296-4e5c-aef5-51ab39136181	dark	\N	\N	@patchbay/theme	\N	\N	\N	\N	f	t	\N	\N	\N
\.


--
-- Data for Name: directus_shares; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
\.


--
-- Data for Name: directus_translations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_translations (id, language, key, value) FROM stdin;
\.


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides) FROM stdin;
c98c06cc-00a7-4916-b81f-e6d192d57165	Admin	User	admin@patchbay.io	$argon2id$v=19$m=65536,t=3,p=4$nKQOujMqpGhnLfQUPIl5Jw$1wBi19y6x1rvw/waVtefgOYZxjbcEagIabxZ5zHFp2g	\N	\N	\N	\N	\N	\N	\N	active	4b92eda1-d0dd-4c1c-9d61-bd4c6c0760d5	\N	2025-05-09 22:29:25.136+00	/settings/appearance	default	\N	\N	t	\N	\N	\N	\N	\N
\.


--
-- Data for Name: directus_versions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_versions (id, key, name, collection, item, hash, date_created, date_updated, user_created, user_updated, delta) FROM stdin;
\.


--
-- Data for Name: directus_webhooks; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.directus_webhooks (id, name, method, url, status, data, actions, collections, headers, was_active_before_deprecation, migrated_flow) FROM stdin;
\.


--
-- Data for Name: patches; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.patches (id, status, user_created, date_created, date_updated, title, definition) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: admin
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: admin
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: admin
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: admin
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: admin
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: admin
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_activity_id_seq', 32, true);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_fields_id_seq', 7, true);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_permissions_id_seq', 1, false);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_presets_id_seq', 2, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_relations_id_seq', 1, true);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_revisions_id_seq', 27, true);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, true);


--
-- Name: directus_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.directus_webhooks_id_seq', 1, false);


--
-- Name: patches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.patches_id_seq', 1, false);


--
-- Name: directus_access directus_access_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_pkey PRIMARY KEY (id);


--
-- Name: directus_activity directus_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);


--
-- Name: directus_collections directus_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);


--
-- Name: directus_comments directus_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_pkey PRIMARY KEY (id);


--
-- Name: directus_dashboards directus_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);


--
-- Name: directus_extensions directus_extensions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_extensions
    ADD CONSTRAINT directus_extensions_pkey PRIMARY KEY (id);


--
-- Name: directus_fields directus_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);


--
-- Name: directus_files directus_files_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);


--
-- Name: directus_flows directus_flows_operation_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);


--
-- Name: directus_flows directus_flows_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);


--
-- Name: directus_folders directus_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);


--
-- Name: directus_migrations directus_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);


--
-- Name: directus_notifications directus_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_reject_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);


--
-- Name: directus_operations directus_operations_resolve_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);


--
-- Name: directus_panels directus_panels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);


--
-- Name: directus_permissions directus_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);


--
-- Name: directus_policies directus_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_policies
    ADD CONSTRAINT directus_policies_pkey PRIMARY KEY (id);


--
-- Name: directus_presets directus_presets_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);


--
-- Name: directus_relations directus_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);


--
-- Name: directus_revisions directus_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);


--
-- Name: directus_roles directus_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);


--
-- Name: directus_sessions directus_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);


--
-- Name: directus_settings directus_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);


--
-- Name: directus_shares directus_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);


--
-- Name: directus_translations directus_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);


--
-- Name: directus_users directus_users_external_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);


--
-- Name: directus_users directus_users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_token_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);


--
-- Name: directus_versions directus_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_pkey PRIMARY KEY (id);


--
-- Name: directus_webhooks directus_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_pkey PRIMARY KEY (id);


--
-- Name: patches patches_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patches
    ADD CONSTRAINT patches_pkey PRIMARY KEY (id);


--
-- Name: directus_access directus_access_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_collections directus_collections_group_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);


--
-- Name: directus_comments directus_comments_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_comments directus_comments_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: directus_dashboards directus_dashboards_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_modified_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);


--
-- Name: directus_files directus_files_uploaded_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);


--
-- Name: directus_flows directus_flows_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_folders directus_folders_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);


--
-- Name: directus_notifications directus_notifications_recipient_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_notifications directus_notifications_sender_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);


--
-- Name: directus_operations directus_operations_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;


--
-- Name: directus_operations directus_operations_reject_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_resolve_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_panels directus_panels_dashboard_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;


--
-- Name: directus_panels directus_panels_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_permissions directus_permissions_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_activity_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);


--
-- Name: directus_revisions directus_revisions_version_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_version_foreign FOREIGN KEY (version) REFERENCES public.directus_versions(id) ON DELETE CASCADE;


--
-- Name: directus_roles directus_roles_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_roles(id);


--
-- Name: directus_sessions directus_sessions_share_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;


--
-- Name: directus_sessions directus_sessions_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_settings directus_settings_project_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_background_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_favicon_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_favicon_foreign FOREIGN KEY (public_favicon) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_foreground_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_registration_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_registration_role_foreign FOREIGN KEY (public_registration_role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_settings directus_settings_storage_default_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_shares directus_shares_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_users directus_users_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_versions directus_versions_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: directus_webhooks directus_webhooks_migrated_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.directus_webhooks
    ADD CONSTRAINT directus_webhooks_migrated_flow_foreign FOREIGN KEY (migrated_flow) REFERENCES public.directus_flows(id) ON DELETE SET NULL;


--
-- Name: patches patches_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.patches
    ADD CONSTRAINT patches_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id);


--
-- PostgreSQL database dump complete
--
