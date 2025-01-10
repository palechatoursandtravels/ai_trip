ALTER TABLE "User" ADD COLUMN "firstName" varchar(50);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "lastName" varchar(50);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "phoneNumber" varchar(15);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "provider" varchar(10) DEFAULT 'credentials';