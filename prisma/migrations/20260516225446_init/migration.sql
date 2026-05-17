-- CreateTable
CREATE TABLE `Dealer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DealerHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weekday` VARCHAR(191) NOT NULL,
    `saturday` VARCHAR(191) NOT NULL,
    `sunday` VARCHAR(191) NOT NULL,
    `dealerId` INTEGER NOT NULL,

    UNIQUE INDEX `DealerHours_dealerId_key`(`dealerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tagline` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `isNew` BOOLEAN NOT NULL DEFAULT false,
    `isElectric` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Car_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarHighlight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarVariant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL DEFAULT 0,
    `transmission` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarVariantSpec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `engine` VARCHAR(191) NOT NULL,
    `transmission` VARCHAR(191) NOT NULL,
    `power` VARCHAR(191) NOT NULL,
    `torque` VARCHAR(191) NOT NULL,
    `fuelType` VARCHAR(191) NOT NULL,
    `seats` INTEGER NOT NULL,
    `drivetrain` VARCHAR(191) NULL,
    `dimLength` INTEGER NULL,
    `dimWidth` INTEGER NULL,
    `dimHeight` INTEGER NULL,
    `dimWheelbase` INTEGER NULL,
    `batteryCapacity` VARCHAR(191) NULL,
    `batteryType` VARCHAR(191) NULL,
    `rangeElectric` VARCHAR(191) NULL,
    `rangeHybrid` VARCHAR(191) NULL,
    `chargingAc` VARCHAR(191) NULL,
    `chargingDc` VARCHAR(191) NULL,
    `features` JSON NOT NULL,
    `variantId` INTEGER NOT NULL,

    UNIQUE INDEX `CarVariantSpec_variantId_key`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `carInterest` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `preferredDate` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DealerHours` ADD CONSTRAINT `DealerHours_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `Dealer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarImage` ADD CONSTRAINT `CarImage_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarHighlight` ADD CONSTRAINT `CarHighlight_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarVariant` ADD CONSTRAINT `CarVariant_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarVariantSpec` ADD CONSTRAINT `CarVariantSpec_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `CarVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
