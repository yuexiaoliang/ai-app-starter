CREATE TABLE `models` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`model_id` text NOT NULL,
	`name` text NOT NULL,
	`family` text,
	`tool_call` integer DEFAULT false NOT NULL,
	`attachment` integer DEFAULT false NOT NULL,
	`reasoning` integer DEFAULT false NOT NULL,
	`temperature` integer DEFAULT true NOT NULL,
	`structured_output` integer DEFAULT false NOT NULL,
	`knowledge` text,
	`release_date` text,
	`last_updated` text,
	`modalities` text,
	`open_weights` integer DEFAULT false NOT NULL,
	`cost_input` real,
	`cost_output` real,
	`cost_cache_read` real,
	`cost_cache_write` real,
	`context_limit` integer,
	`output_limit` integer,
	`input_limit` integer
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`npm` text,
	`api` text,
	`doc` text,
	`env` text,
	`model_count` integer DEFAULT 0 NOT NULL,
	`synced_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'todo' NOT NULL,
	`priority` text DEFAULT 'medium' NOT NULL,
	`tags` text,
	`due_date` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
